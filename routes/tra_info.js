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
        `select car_ID, car_NO, vac, temp, hum from tb_car_ma;`,
        function(err, result){
            if(err){
                console.log(err);
                res.send("list SQL select Error")
            }else {
                connection.query(
                    `select pi, cr, ri, con from mobiusdb.cin where (pi, ri) in (
                        select pi, ri from mobiusdb.cin group by pi
                        ) order by ri desc;`,
                    function(err2, result2){
                        if(err2){
                            console.log(err2);
                            res.send("list2 SQL select Error")
                        } else {
                            res.render("tra_info", {
                                list : result,
                                list2 : result2
                            })
                        }
                    }
                )
            }
        }
    )
})

module.exports = router;