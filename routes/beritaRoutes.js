const express = require('express')
const router = express.Router()
const { createBerita, getAllBerita } = require('../controllers/beritaController')
const { authentication } = require('../middleware/authMiddleware')
const uploadImage  = require('../middleware/imageMiddleware');

router.post('/add-berita', uploadImage('gambar_berita').single('gambar_berita'), createBerita)
router.get('/berita', authentication, getAllBerita)

module.exports = router;