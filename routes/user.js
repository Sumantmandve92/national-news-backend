
const varifyToken = require("../authentication");
const User = require("../modals/User");
const bcrypt = require("bcrypt");
const router = require("express").Router();

// =================All apis=====================================

// API-user-update=================================================
router.post("/updateuser/:id", varifyToken, async (req, resp) => {
    // id=>users-Id and admin can also update anyones account
    try {
        if (req.body.user._doc.isAdmin) {
            // if (req.body.password) {
            //     try {
            //         const salt = await bcrypt.genSalt(10);
            //         req.body.password = await bcrypt.hash(req.body.password, salt);
            //     } catch (error) {
            //      resp.status(500).json(error);
            //     }
            // }
            try {
                // console.log(typeof req.body.data,"jiihi");
                const data = req.body.data;
                // console.log(typeof data,"hudhf")
                const user = await User.findByIdAndUpdate({ _id: req.params.id }, { $set: { ...data } });
                // console.log(user, "dbuser");
                resp.status(200).json("user updated");
            } catch (error) {
                console.log(error)
                resp.status(500).json(error)
            }
        }
        else {
            return resp.status(403).json("you can update only your account")
        }
    } catch (error) {
        resp.status(500).json(error)
    }
});

// API-getAll users===========================================================================
router.post("/getAllUsers", varifyToken, async (req, resp) => {
    try {
        if (req.body.user._doc.isAdmin) {
            const allUsers = await User.find({ isAdmin: false });
            resp.status(200).json(allUsers);
        }
        else {
            resp.status(403).json("You are not admin");
        }
    } catch (error) {
        resp.status(500).json(error);
    }
})
// API-get user===========================================================================
router.post("/getUser/:userId", varifyToken, async (req, resp) => {
    try {
        if (req.body.user._doc.isAdmin) {
            const user = await User.findById({_id:req.params.userId});
            resp.status(200).json(user);
        }
        else {
            resp.status(403).json("You are not admin");
        }
    } catch (error) {
        resp.status(500).json(error);
    }
})
// API-delete user============================================================================
router.post("/deleteUser/:id", varifyToken, async (req, resp) => {
    // id=>userId and admin can also delete anyones account
    try {
        // const user = await User.findById({ _id: req.body.userId });
        if (req.body.user._doc.isAdmin) {
            const user = await User.findByIdAndDelete({ _id: req.params.id });
            resp.status(200).json("account has been deleted");

        }
        else {
            return resp.status(403).json("you can't delete  your account")
        }
    } catch (error) {
        resp.status(500).json(error)

    }

})




module.exports = router