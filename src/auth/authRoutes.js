const router = require("express").Router();
const user = require("../model/user");
const bcrypt = require("bcrypt"); //it changes our password to hashes or protect

//Register a new user:
router.post("/register", async (req, res) => {

    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        const newUser = new user({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        });



        const User = await newUser.save();
        res.status(201).json(User)


    } catch (error) {
        console.error(error);
    }




})

//Login user:
router.post("/login", async (req, res) => {
    try {
      const User = await user.findOne({ email: req.body.email });
  
      // if user not found:
      if (!User) {
        return res.status(404).json("User not found");
      }
  
      const validPassword = await bcrypt.compare(req.body.password, User.password);
      if (!validPassword) {
        return res.status(400).json("Wrong password");
      }
  
      // If all is fine
         res.status(200).json(User);
    } catch (error) {
      console.error(error);
      // Handle any other errors that may occur
      return res.status(500).json("Internal Server Error");
    }
  });
  



module.exports = router;