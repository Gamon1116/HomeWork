const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single('file');

router.post('/image', (req, res) => {
  // 가져온 이미지를 저장을 해주면 된다.
  upload(req, res, (err) => {
    if (err) {
      return req.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

// client의 uploadproductpage에서 오는것 같은 end포인트를 줘야하는데 이미 app.js에서 /api/product로 주어졌기 때문에
router.post('/', (req, res) => {
  // 받아온 정보를 DB에 넣어줌 uploadproductpage에서 axios body에 담겨있는 정보
  //  정보들이 req.body에 담겨있고 product에 넣음
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post('/products', (req, res) => {
  // product collection 에 들어있는 모든 상품 가져오기

  // Landing페이지에서 body로 받아옴  parseInt는 String인경우 숫자로 바꿔줌
  // request.body.imit 있으면 지정해 준것으로 없으면 20으로
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  // request.body.skip 이 있으면 지정해준것으로 없으면 처음부터(0)
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  Product.find()
    .populate('writer')
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res
        .status(200)
        .json({ success: true, productInfo, postSize: productInfo.length });
    });
});

module.exports = router;
