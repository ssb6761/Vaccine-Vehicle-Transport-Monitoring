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
        `select con as temp, substring(ri, 32, 8) as date, substring(ri, 40, 9) as time 
        from cin where pi = '/Mobius/` + req.query._car_ID + `/cnt-temperature'
        order by date desc, time desc`,
        function(err, result){
            if(err){
                console.log(err);
                res.send("list SQL select Error")
            }else {
                connection.query(
                    `select con as hum, substring(ri, 32, 8) as date, substring(ri, 40, 9) as time 
                    from cin where pi = '/Mobius/` + req.query._car_ID + `/cnt-humidity'
                    order by date desc, time desc`,
                    function(err2, result2){
                        if(err2){
                            console.log(err2);
                            res.send("list2 SQL select Error")
                        }else {
                            var car_ID = req.query._car_ID;
                            connection.query(
                                `select A.car_ID as car_ID, A.car_NO as car_NO, A.vac as vac, A.temp as temp, A.hum as hum from tb_car_ma as A join cin as B where car_ID = ?`,
                                [car_ID],
                                function(err3, result3){
                                    if(err3){
                                        console.log(err3);
                                        res.send("list3 SQL select Error")
                                    } else {
                                        res.render("car_info", {
                                            list : result,
                                            list2 : result2,
                                            list3 : result3
                                        })
                                    }
                                }
                            )
                        }
                    }
                )
            }
        }
    )
})

router.get("/car_bb", function(req, res){
    var car_ID = req.query._car_ID;
    connection.query(
        `select car_ID, car_NO, IP from tb_car_ma where car_ID = ?`,
        [car_ID],
        function(err, result){
            if(err){
                console.log(err);
                res.send("list SQL select Error")
            } else {
                res.render("car_bb",{
                    list : result
                })
            }
        }
    )
})

router.get("/car_ch", function(req, res){
    connection.query(
        `select con as temp, substring(ri, 32, 8) as date, substring(ri, 40, 9) as time 
        from cin where pi = '/Mobius/` + req.query._car_ID + `/cnt-temperature'
        order by date desc, time desc`,
        function(err, result){
            if(err){
                console.log(err);
                res.send("list SQL select Error")
            }else {
                connection.query(
                    `select con as hum, substring(ri, 32, 8) as date, substring(ri, 40, 9) as time 
                    from cin where pi = '/Mobius/` + req.query._car_ID + `/cnt-humidity'
                    order by date desc, time desc`,
                    function(err2, result2){
                        if(err2){
                            console.log(err2);
                            res.send("list2 SQL select Error")
                        }else {
                            var car_ID = req.query._car_ID;
                            connection.query(
                                `select A.car_ID as car_ID, A.car_NO as car_NO, A.vac as vac, A.temp as temp, A.hum as hum from tb_car_ma as A join cin as B where car_ID = ?`,
                                [car_ID],
                                function(err3, result3){
                                    if(err3){
                                        console.log(err3);
                                        res.send("list3 SQL select Error")
                                    } else {
                                        var temp = "";
                                        var hum = "";
                                        var time = "";
                                        var a_temp = "";
                                        var a_hum = "";
                                        var car_ID = "";
                                        var car_NO = "";
                                        for(var i = 0; i < result.length; i++){
                                            temp += result[i].temp + ",";
                                            hum += result2[i].hum + ",";
                                            time += result2[i].time.substring(0,2)+":"+result2[i].time.substring(2,4)+":"+result2[i].time.substring(4,6) + ",";
                                            a_temp += result3[i].temp + ",";
                                            a_hum += result3[i].hum + ",";
                                            car_ID = result3[i].car_ID + ",";
                                            car_NO = result3[i].car_NO + ",";
                                        }
                                        res.render("car_ch",{
                                            list : result,
                                            list2 : result2,
                                            list3 : result3,
                                            "temp" : temp,
                                            "hum" : hum,
                                            "time" : time,
                                            "a_temp" : a_temp,
                                            "a_hum" : a_hum,
                                            "car_ID" : car_ID,
                                            "car_NO" : car_NO
                                        })
                                    }
                                }
                            )
                        }
                    }
                )
            }
        }
    )
})

module.exports = router;