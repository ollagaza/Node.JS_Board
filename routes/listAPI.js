var express = require('express');
var router = express.Router();
var mysql = require('mysql');  // db 폴더를 만들어서 conn 과 info 를 만들어 코드의 길이를 최대한줄일수도있다고한다
var mysql_odbc = require('../db/db_conn')();
var conn = mysql_odbc.init();

/* GET home page. */
router.get('/', function(req, res, next) {
    let ipp = 10;
    let totalCount = 0;
    let block = 10;
    let total_page = 0;
    let page = 1;
    let start = 0;
    let end = ipp;
    let start_page = 1;
    let end_page = block;
    let sql = "";
    let where = "";

    body = req.query; //get
    let job_code = body.job_code;
    let keyword = body.keyword;

    let datas = [job_code, keyword]; // 변수설정한 값을 datas 에 배열화
    //if(keyword) where += `AND title like '%${keyword}%' `;


    //sql = `SELECT idx, name, title, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate,
    //    date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate, hit from board WHERE board_code = ? ${where} ORDER BY idx DESC`;
    sql = "CALL spJobList(?,?)";
    //console.log(sql);
    conn.query(sql, datas, function(err, rows) {  // select 쿼리문 날린 데이터를 rows 변수에 담는다 오류가 있으면 err
        if (err) {
            console.error("err : " + err);
            res.send({success: false, list:''});
        }else{
            rows[1].forEach( (row) => { totalCount = row.totalCount });

            //totalCount = rows[1];
            console.log(totalCount);
            total_page = Math.ceil(totalCount/ipp);

            if(body.page) page = body.page;
            start = (page - 1) * 10;
            start_page = Math.ceil(page / block);
            end_page = start_page * block;

            if(total_page < end_page) end_page = total_page;

            let paging = {
                "totalCount":totalCount
                ,"total_page": total_page
                ,"page":page
                ,"start_page":start_page
                ,"end_page":end_page
                ,"ipp":ipp
            }

            // 일반 쿼리 사용시 rows, 프로시져 사용시 rows[0]로 처리
            //res.render('list.ejs', {title : '게시판 리스트',  rows:rows});
            res.send({success: true, list:rows[0], paging:paging});
            //res.status(200).json(
            //    rows
            //);
        }

    });

});

module.exports = router;