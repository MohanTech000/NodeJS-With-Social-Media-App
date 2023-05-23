const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const port = process.env.PORT || 3000;
const userRoutes = require("../src/routes/routes");
const userAuth = require("../src/auth/authRoutes");
const userPosts = require("../src/routes/post");




require("./connection/mongo");


//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRoutes);
app.use("/api/auth", userAuth);
app.use("/api/post", userPosts);




app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
})