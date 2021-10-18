var express = require('express');
const AuthController = require('../controllers/AuthController');
const ProductController = require('../controllers/ProductController');
const ProfileController = require('../controllers/ProfileController');
const StokopnameController = require('../controllers/StokopnameController');
const { verifyIdentity, authentication } = require('../middlewares/Authentication');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Web service for stok opname on application filosoft' });
});

router.use(verifyIdentity)
// login
router.post('/login', AuthController.login)
router.use(authentication)
// barang
router.post('/barang', ProductController.product)
router.post('/barang/detail_barang', ProductController.detailProduct)
// stok opname
router.post('/stok_opname', StokopnameController.stokOpname)
router.post('/stok_opname/proses_stok_opname', StokopnameController.prosesStokopname)
// profile
router.get('/profile', ProfileController.profile)
router.post('/profile/change_password', ProfileController.changePassword)

module.exports = router;
