const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

// router 
const authRoute  = require("./routes/authRoute.js");
const productRoute = require("./routes/productRoute.js");
const blogRoute = require("./routes/blogRoute.js");

const { notFound, errorHandler } = require("./middlewares/errorHandler.js");

const app = express();
const PORT = process.env.PORT || 6000
const dbConnect = require("./config/dbConnect.js");
dbConnect();

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", authRoute);
app.use("/api/product", productRoute);
app.use("/api/blog", blogRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server working on ${PORT}`);
});