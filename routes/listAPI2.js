var express = require('express');
var router = express.Router();
var mysql = require('mysql');  // db 폴더를 만들어서 conn 과 info 를 만들어 코드의 길이를 최대한줄일수도있다고한다
var mysql_odbc = require('../db/db_conn')();
var connection = mysql_odbc.init();

/* GET home page. */
router.get('/', function(req, res, next) {
    var sql = "SELECT idx, name, title, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate, " +
        "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate, hit from board ORDER BY idx DESC";
    connection.query(sql, function(err, rows) {  // select 쿼리문 날린 데이터를 rows 변수에 담는다 오류가 있으면 err
        if (err) {
            console.error("err : " + err);
            res.send({success: true, list:''});
        }else{}
        //
        //res.render('list.ejs', {title : '게시판 리스트',  rows:rows});
        //res.send({success: true, list:rows});
        res.status(200).json(
            rows
        );
    });
});

module.exports = router;