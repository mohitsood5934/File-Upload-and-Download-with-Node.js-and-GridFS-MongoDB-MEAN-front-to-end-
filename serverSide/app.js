require('dotenv').config()
const hostname = process.env.HOST
const port = process.env.PORT
const express = require("express");
var fs = require("fs");
var path = require("path");
var morgan = require("morgan");
var cors = require("cors");
var mongo = require('mongodb')
var crypto = require("crypto")
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const bodyParser = require("body-parser")
const app = express();
//database connection setup
const mongoose = require("mongoose");
mongoose.Promise = global.Promise
const mongoURI = "mongodb://localhost:27017/gridfsFileUpload";

// connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
//init stream 
var gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});
// Storage
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    console.log("inside storage")
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({
  storage: storage
})
//middlewares used 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'rtfLogFile.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(cors());
//getting all the files 
app.get("/api/files", (req, res) => {
  gfs.find().toArray((err, files) => {
    // check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "no files exist"
      });
    }

    return res.json(files);
  });
});
// Upload File Function
app.post('/api/upload', upload.single('image'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });

  } else {
    console.log('File is available!');
    return res.send({
      success: true
    })
  }
});
//Downloading the file
app.get("/api/download/:id", (req, res) => {
  console.log(req.params.id)
  var id = req.params.id
  var o_id = new mongo.ObjectID(id);
  var file = gfs
    .find({
      _id: o_id
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist"
        });
      }
      gfs.openDownloadStream(o_id).pipe(res)
    });
});
//deleting the file
app.delete("/api/delete/:id/:name", function (req, res) {
  var id = req.params.id
  var fileId = new mongo.ObjectID(id);
  console.log(fileId)
  gfs.delete(fileId, (err, data) => {
    if (err) return res.status(404).json({ err: err.message });
    else return res.json('Successfully removed');
  });
})
app.listen(port, function (req, res) {
  console.log("You are listening to port", port)
})
