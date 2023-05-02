const News = require("../modals/News");
const User = require("../modals/User");
const varifyToken = require("../authentication");
const router = require("express").Router();

// API-add news========================================================
router.post("/addNews",varifyToken, async (req, resp) => {
    try {
      
        if (req.body.user._doc.isAdmin) {
            const news = new News(req.body.news);
            const savedNews = await news.save();
            resp.status(200).json(savedNews);
        }
        else {
            // 403-forbidden,401-unauthorized
            resp.status(403).json("you are not authorised to add news")
        }
    } catch (error) {
        // 500 internal server error
        resp.status(500).json(error);
    }
})

// API-get all news========================================================
router.get("/getallNews/:category", async (req, resp) => {
    try {
        let news=[];
        if(req.params.category==="all"){

             news = await News.find({});
        }
        else{
            news = await News.find({category:req.params.category});
        }
        resp.status(200).json(news);
    } catch (error) {
        resp.status(500).json(error);

    }
})

// API-get news========================================================
router.post("/getNews/:newsId",varifyToken, async (req, resp) => {
    try {
      
       const news=await News.findById({_id:req.params.newsId});
        resp.status(200).json(news);
    } catch (error) {
        resp.status(500).json(error);

    }
})

// API-update news========================================================
router.put("/updateNews/:postId", varifyToken,async(req,resp)=>{
    try {
       
        if(req.body.user._doc.isAdmin){
            const news =await News.findByIdAndUpdate({_id:req.params.postId},{
                $set:req.body.news
            });
            resp.status(200).json(news);
        }
        else{
            resp.status(403).json("you are not authorised to add news")
        }
    } catch (error) {
        resp.status(500).json(error);
    }
})

// API-delete post==========================================================

router.post("/deleteNews/:newsId",varifyToken, async(req,resp)=>{
    try {
   
      
        if(req.body.user._doc.isAdmin){
            await News.findByIdAndDelete({_id:req.params.newsId});
            resp.status(200).json("deleted successfully");
        }
        else{
            resp.status(403).json("you are not authorised to delete news")
        }
    } catch (error) {
        console.log(error);
        resp.status(500).json(error);
    }
})


module.exports = router;
