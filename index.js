var express = require("express");   // var -> const로 써도 됨
var app = express();
var session = require("express-session");

app.set("views", __dirname+"/views");
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(
    session({
        secret : "pqwhuqirhakdn",
        resave : false,
        saveUninitialized : true,
        maxAge : 3600000
    })
)

var car_manage = require("./routes/car_manage");
app.use("/car_manage", car_manage);

var car_info = require("./routes/car_info");
app.use("/car_info", car_info);

var tra_info = require("./routes/tra_info");
app.use("/tra_info", tra_info);

var map = require("./routes/map");
app.use("/map", map);

var cover = require("./routes/cover");
app.use("/cover", cover);

app.get("/", function(req, res){
    res.redirect("cover")
})

app.listen(3000, function(){
    console.log("project server start")
})