"use strict";

var express = require("express");
var app = express();

require("dotenv").config();

var cors = require("cors");
app.use(cors({ origin: "*" }));
// app.use(cors({origin: ['https://reportkad.netlify.app','https://marvellous-idoko.github.io/EduRepo',
// 'https://marvellous-idoko.github.io/tutoAdmin',
// 'http://localhost:4200','http://localhost:8080']}));
// app.use(cors({origin: 'http://localhost:4200'}));

var mongoose = require("mongoose");
// const admin = require("./routes/admin");
// const auth = require("./routes/auth");
// const vendor = require("./routes/vendor");
// const gifts = require("./routes/gifts");

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
mongoose.connect(process.env.MONGO_DB_URL);
mongoose.connection.on("connected", () => {
    console.log("connected to DB");
});
mongoose.connection.on("error", (err) => {
    // if(err)console.log("error in DB connection"+err);
    console.log(err);
});
const pay = require('./routes')
app.use("/api", pay);

// app.get("/api", function (req, res) {
//     res.send("Hello from root route.");
// });

// // require("./router")(app);

// // app.use('/admin', adminData.routes);
// app.use("/CSS", (req, res, next) => {
//   // console.log(__dirname+'/CSS'+req.url)
//   res.sendFile(__dirname + "/threesixteen/style.css");
//   // next();
// });
// app.use("/img", (req, res) => {
//   // console.log(__dirname+'/CSS'+req.url)
//   res.sendFile(__dirname + "/img" + req.url);
// });
app.use("/css", (req, res) => {
    res.sendFile(`${__dirname}/frontend${req.url}`);
});
app.use("/css", (req, res) => {
    res.sendFile(`${__dirname}/frontend${req.url}`);
});
app.use("/js", (req, res) => {
    res.sendFile(`${__dirname}/frontend${req.url}`);
});
app.use("/assets", (req, res) => {
    res.sendFile(__dirname + "/frontend/assets" + req.url);
});
app.use("/verify-trxn", (req, res) => {
    res.sendFile(__dirname + "/frontend/verify.html");

});
app.use("/", (req, res) => {
    res.sendFile(__dirname + "/frontend/index.html");

});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("starting... server at " + port);
});
