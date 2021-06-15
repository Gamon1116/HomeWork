const express = require('express');
const router = express.Router();
const multer = require('multer');


//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  })
   
  var upload = multer({ storage: storage }).single('file');


router.post('/image', (req, res) => {

    // 가져온 이미지를 저장을 해주면 된다.
    upload(req, res, err => {
        if(err) {
            return req.json({ success: false, err})
        }
        return res.json({ success: true, filePath: res.req.filepath, fileName: res.req.filename})
    })



})



module.exports = router;
