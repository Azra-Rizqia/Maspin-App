const express = require('express')
const router = express.Router()
const { createPasar, getAllPasar } = require('../controllers/pasarController')
const { createDetailPasar, getDetailPasar } = require('../controllers/detailPasarController')
const { authentication } = require('../middleware/authMiddleware')
const uploadImage = require('../middleware/imageMiddleware');

router.post('/add-pasar', uploadImage('gambar_pasar').single('gambar_pasar'), createPasar)
router.get('/', authentication, getAllPasar)

router.post('/add-detail-pasar/:pasarId', uploadImage('gambar_barang').single('gambar_barang'), createDetailPasar)
router.get('/detail-pasar', authentication, getDetailPasar)

module.exports = router;