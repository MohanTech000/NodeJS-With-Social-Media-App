const router = require("express").Router();
const user = require("../model/user");
const bcrypt = require("bcrypt");

//update User

router.put("/:id", async (req, res) => {

    if (req.body.userId == req.params.id || req.user.isAdmin) {

        if (req.body.password) {
            try {

                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (err) {
                return res.status(500).json(err);
            }
        }

        try {

            const User = await user.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });

            res.status(200).json("Account has been updated");

        } catch (err) {
            return res.status(500).json(err)
        }

    } else {
        return res.status(403).json("you can update only your account");
    }

});


//delete User
router.delete("/:id", async (req, res) => {

    if (req.body.userId == req.params.id || req.body.isAdmin) {

        if (req.body.password) {
            try {

                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (err) {
                return res.status(500).json(err);
            }
        }

        try {

            const User = await user.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");

        } catch (err) {
            return res.status(500).json(err)
        }

    } else {
        return res.status(403).json("you can delete only your account");
    }

});




//get user by id
router.get("/:id", async (req, res) => {
    try {

        const User = await user.findById(req.params.id);
        const { password, updatedAt, ...other } = User._doc  //this will remove hide the passs updated at and others.
        res.status(200).send(other)

    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})




//Follow user 
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) { //check user is same or not
        try {
            const User = await user.findById(req.params.id);
            const currentUser = await user.findById(req.body.userId); //follow krne wala/ req bhejne wala
            if (!User.followers.includes(req.body.userId)) { //if no followed then this neche wala code ok!
                await User.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followee: req.params.id } });
                res.status(200).json("user has been followed");
            } else {
                res.status(403).json("you allready follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you can't follow yourself");
    }
});
//unFollow user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const User = await user.findById(req.params.id);
            const currentUser = await user.findById(req.body.userId);
            if (User.followers.includes(req.body.userId)) {
                await User.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followee: req.params.id } });
                res.status(200).json("user has been unfollowed");
            } else {
                res.status(403).json("you dont follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you can't unfollow yourself");
    }
});

module.exports = router;