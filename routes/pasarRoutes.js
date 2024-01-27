const express = require('express')
const router = express.Router()
const { createPasar, getAllPasar, updatePasar, getPasarById } = require('../controllers/pasarController')
const { createDetailPasar, getDetailPasar, updateDetailPasar } = require('../controllers/detailPasarController')
const { authentication } = require('../middleware/authMiddleware')
const uploadImage = require('../middleware/imageMiddleware');

router.post('/add-pasar', uploadImage('gambar_pasar').single('gambar_pasar'), createPasar)
router.put('/update-pasar/:id', uploadImage('gambar_pasar').single('gambar_pasar'), updatePasar)
router.get('/:id', authentication, getPasarById)
router.get('/', authentication, getAllPasar)

router.post('/add-detail-pasar/:pasarId', uploadImage('gambar_barang').single('gambar_barang'), createDetailPasar)
router.put('/:pasarId/detail-pasar/:detailPasarId', uploadImage('gambar_barang').single('gambar_barang'), updateDetailPasar)
router.get('/detail-pasar/:pasarId', authentication, getDetailPasar)

module.exports = router;