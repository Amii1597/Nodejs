const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const description = new mongoose.Schema({
 companyname: {
    type: String,
    required: true,
  },
category: {
    type: String,
    required: true,
  },
  logoURL: {
    type: String,
    required: true,
  },
link: {
    type: String,
    required: true,
  },
description: {
    type: String,
    required: true,
  }, 
//    content: { type: String, required: true, trim: true },
//   upvotes: { type: Number, default: 0},
//   downvotes: { type: Number, default: 0},
// },{
// timestamps: true,
  // upvotes:{
  //   type : Number,
  //   required:true,
  // },
});

//We are hashing the password
// userSchema.pre("save", async function (next) {
//   console.log("hii from inside");
//   if (this.isModified("password")) {
//     this.password = bcrypt.hash(this.password, 12);
//   }
//   next();
// });
//   we r genreating token
// userSchema.methods.generateAuthToken = async function () {
//   try {
//     let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
//     this.tokens = this.tokens.concat({ token: token });
//     await this.save();
//     return token;
//   } catch (err) {
//     console.log(err);
//   }
// };
const Add = mongoose.model("Add", description);

module.exports = Add;
