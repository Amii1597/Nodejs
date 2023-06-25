const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("/public"));
require("./db/conn");

app.use(express.json());

app.use(require("./router/auth"));
const PORT = process.env.PORT;

//Middelware
// const middleware = (req, res, next) => {
//   console.log("hello my Middleware");
//   next();
// };

// app.get("/Login", middleware, (req, res) => {
//   res.json({ message: "Welcome" });
// });
app.get("/phone", (req, res) => {
  res.cookie("Test",'amisha')
  res.json({ message: "You are new user !welcome" });
});

// app.listen(process.env.PORT, () => {
//   mongoose
//     .connect(process.env.MONGODB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log(`Server running on http://localhost:${process.env.PORT}`);
//     })
//     .catch((err) => console.log(err));
// });
app.listen(PORT, () => {
  console.log(`server is runnig at port no ${PORT}`);
});
