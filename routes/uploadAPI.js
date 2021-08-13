var express = require('express');
var router = express.Router();

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

router.post('/', upload.array('image',10), (req, res) => {
    console.log(req.file, req.body);
    res.send('OK');
});

module.exports = router;