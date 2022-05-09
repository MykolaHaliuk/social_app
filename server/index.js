require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const router = require("./router/index");
const errorMiddleware = require("./middllewares/error-middlleware");


const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URI
}));
app.use(helmet());
app.use(morgan("common"));
app.use("/api", router);
app.use(errorMiddleware);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/server/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
  }
});

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, () => {
      console.log("Connected to MongoDB");
    });
    app.listen(PORT, ()=> console.log(`Server started on PORT = ${PORT}`))

  } catch (e){
    console.log(e);
  }

}

start();