const User = require("../modals/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
// API-Register new User======================================================================
router.post("/registerUser", async (req, resp) => {


    try {

        // const salt = await bcrypt.genSalt(10);
        // const encryptedPass = await bcrypt.hash(req.body.password, salt);
        const userExists = await User.findOne({ email: req.body.email });
        if (!userExists) {


            const newuser = new User(req.body)
            const user = await newuser.save();
            resp.status(200).json(user);
        }
        else {
            resp.status(401).json("user already exists");
        }

        // create new profile =====================================

        // ========================================================
    } catch (error) {
        resp.status(500).json(error);
    }

})

// API-Login user=============================================================================
router.post("/loginuser", async (req, resp) => {
    try {
        console.log(req.body);
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            // validate password
            // const isvalidPassword = await bcrypt.compare(req.body.password, user.password);
            if (req.body.password === user.password) {
                // generate token
                const token = jwt.sign({ ...user }, process.env.SECRET_KEY)
             
                resp.status(200).json({user,token});
            }
            else {
                resp.status(400).json("wrong password");

            }
        }
        else {
            resp.status(404).json("user not found");
        }

    } catch (error) {
        resp.status(500).json(error);
    }
})


module.exports = router;