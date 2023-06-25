const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
require("../db/conn");
const User = require("../model/userSchema");
const Add = require("../model/userSchema2");
const Comment = require("../model/comments");
router.get("/", (req, res) => {
  res.send("hellow router");
});
//Register
// router.post('/register', async(req,res)=>{
//   const { name, email, mobile, password } = req.body;
//   if (!name || !email || !mobile || !password) {
//       return res.status(422).json({ error: "plz fill all the details" });
//        }
//        try{
//         const userExist = await User.findOne({email:email});
//         if(userExist){
//           return res.status(422).json({ error: "email already" });
//         }
//         const user = new User({ name, email, mobile, password });

//         await User.save();
//           res.status(201).json({ message: "user Registered Successfuly" });
//         }catch (err){

//           console.log(err);

//        }
// })
router.post("/register", (req, res) => {
  const { name, email, mobile, password } = req.body;
  if (!name || !email || !mobile || !password) {
    return res.status(422).json({ error: "plz fill all the details" });
  }
  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "alredy Exist" });
      }
      const user = new User({ name, email, mobile, password });
      user
        .save()
        .then(() => {
          res.status(201).json({ message: "user Registered Successfuly" });
        })
        .catch((err) =>
          res.status(500).json({ error: "failed to registered" })
        );
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(req.body.name ||;!
  // ||o!nsole ||l!og(req.body.email);
  // res.json({message:req.body});
});

//description
router.post("/addproduct", (req, res) => {
  const {
    companyname,
    category,
    logoURL,
    link,
    description,
    // content,
    // upvotes,
    // downvotes,
    // upvotes,
  } = req.body;
  if (
    !companyname ||
    !category ||
    !logoURL ||
    !link ||
    !description 
    // !content ||
    // !upvotes ||
    // !downvotes ||
    // !upvotes ||
    // !content
  ) {
    return res.status(422).json({ error: "plz fill all the details" });
  }
  Add.findOne({ companyname: companyname })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "alredy Exist" });
      }
      const add = new Add({
        companyname,
        category,
        logoURL,
        link,
        description,
        // downvotes,
        // upvotes,
        // content,
      });
      add
        .save()
        .then(() => {
          res.status(201).json({ message: "user Registered Successfuly" });
        })
        .catch((err) =>
          res.status(500).json({ error: "failed to registered" })
        );
    })
    .catch((err) => {
      console.log(err);
    });
});

//Login Route

router.post("/signin", async (req, res) => {
  // console.log(req.body);
  // res.json({message:"Awesome"});
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "plz filled the data" });
    }
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (isMatch) {
        res.status(400).json({ error: "Invalid Credientials" });
      } else {
        res.json({ message: "user signin Successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credientialsss" });
    }
  } catch (err) {
    res.status(400).json({ error: "Error" });
  }
});
router.get("/about", authenticate, (req, res) => {
  console.log("hello my about");
  res.send(req.rootUser);
});

// Logout Page
router.get("/logout"),
  (req, res) => {
    console.log("Hello my Logout Page");
    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).send("User Logout");
  };
//  get all the deatials all product
router.get("/addproduct", async (req, res) => {
  try {
    const add = await Add.find();
    res.json(add);
  } catch (error) {
    res.json({ error });
  }
});
// comment section
router.get("/add", (req, res) => {
  Comment.find()

    .then((comments) => res.json(comments))
    .catch((err) => res.status(400).json("Error" + err));
});

router.post("/add", async (req, res) => {
  console.log(req.user);
  const comment = new Comment({
    // User : req.User._id,
    content: req.body.content,
  });
  try {
    const savedComment = await comment.save();
    const savedCommentWithUserData = await Comment.findById(savedComment);
    res.send(savedCommentWithUserData);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/update/", async (req, res) => {
  console.log(req.user);
  try {
    await Comment.findByIdAndUpdate(req.body._id, {
      upvotes: req.body.upvotes,
      downvotes: req.body.downvotes,
    });
    res.send({ success: true });
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
