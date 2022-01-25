var express = require("express");
var router = express.Router();
var mysql = require("mysql2");

var connection = mysql.createConnection({
    host : 3000,
    port : 3307,
    user : "root",
    password : "1111",
    database : "mobiusdb"
})

router.get("/", function(req, res){
    connection.query(
        'select * from tb_car_ma',
        function(err, result){
            if(err){
                console.log(err);
                res.send("list SQL select Error")
            }else {
                res.render("car_manage",{
                    "list" : result     
                })
            }
        }
    )
})

router.get("/car_register", function(req, res){
    res.render("car_register")
})

router.post("/car_register", function(req, res){
    var car_ID = req.body._car_ID;
    var car_NO = req.body._car_NO;
    var IP = req.body._IP;
    var lat = req.body._lat;
    var lng = req.body._lng;
    var temp = req.body._temp;
    var hum = req.body._hum;
    var vac = req.body._vac;
    connection.query(
        'insert into tb_car_ma(car_ID, car_NO, IP, lat, lng, temp, hum, vac) values (?, ?, ?, ?, ?, ?, ?, ?)',
        [car_ID, car_NO, IP, lat, lng, temp, hum, vac],
        function(err, result){
            if(err){
                console.log(err);
                res.send("write SQL insert Error")
            }else {
                res.redirect("/car_manage");
            }
        }
    )
})

router.get("/car_update", function(req, res){
    var car_ID = req.query._no;
    connection.query(
        `select * from tb_car_ma where car_ID = ?`,
        [car_ID],
        function(err, result){
            if(err){
                console.log(err);
                res.send("update SQL select Error")
            }else {
                res.render("car_update",{
                    "update" : result[0]
                });
            }
        }
    )
})

router.post("/car_update", function(req, res){
    var car_ID = req.body._no;
    var car_NO = req.body._car_NO;
    var IP = req.body._IP;
    var lat = req.body._lat;
    var lng = req.body._lng;
    var temp = req.body._temp;
    var hum = req.body._hum;
    var vac = req.body._vac;    connection.query(
        `update tb_car_ma set car_NO = ?, IP = ?, lat = ?, lng = ?, temp = ?, hum = ?, vac = ? where car_ID = ?`,
        [car_NO, IP, lat, lng, temp, hum, vac, car_ID],
        function(err, result){
            if(err){
                console.log(err);
                res.send("update SQL update Error")
            }else {
                res.redirect("/car_manage");
            }
        }
    )
})

router.get("/delete", function(req, res){
    var car_ID = req.query._no;
    connection.query(
    'delete from tb_car_ma where car_ID = ?',
    [car_ID],
    function(err, result){
        if(err){
            console.log(err);
            res.send("delete SQL delete Error");
        }else {
            res.redirect("/car_manage");
        }
    })
})

module.exports = router;