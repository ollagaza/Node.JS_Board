var express = require('express');
var router = express.Router();
var mysql = require('mysql');  // db 폴더를 만들어서 conn 과 info 를 만들어 코드의 길이를 최대한줄일수도있다고한다
var mysql_odbc = require('../db/db_conn')();
var conn = mysql_odbc.init();

const multer = require('multer');
const path = require('path');
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'public/uploadFiles/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
            //done(null, file.originalname);
        },
    }),
});


/* GET home page. */
router.post('/', upload.array('image', 4), function(req, res, next) {

    body = req.body; //post
    let job_code = body.job_code;
    let subject = body.subject;
    let content = body.content;
    let worker = body.worker;
    let manager = body.manager;

    let filename = "";
    for (let i = 0; i < req.files.length; i++) {
        filename += `///public/uploadFiles/${req.files[i].filename}`;
    }

    //let files = body.file.filename;
    //const { filename, mimetype, size } = req.file;
    //let filepath = req.file;
   //console.log(filename);
   // console.log(filepath);
    //let file = req.file;

    //let result = {
    //    originalName : file.originalname,
    //    size : file.size,
    //};
    let datas = [job_code, subject, content, worker, manager, filename]; // 변수설정한 값을 datas 에 배열화

    sql = "CALL spJobWrite(?, ?, ?, ?, ?, ?)";
    conn.query(sql, datas, function(err, rows) {  // write 쿼리문 날린 데이터를 rows 변수에 담는다 오류가 있으면 err
        if (err) {
            console.error("err : " + err);
            res.send({success: false, write:''});
        }else{
            // 일반 쿼리 사용시 rows, 프로시져 사용시 rows[0]로 처리
            //res.render('list.ejs', {title : '게시판 리스트',  rows:rows});
            res.send({success: true, write:rows[0]});
            //res.status(200).json(
            //    rows
            //);
        }

    });

});

module.exports = router;