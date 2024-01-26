const express = require('express');
const router = express.Router();
const { createLaporan, getLaporan, updateLaporan, deleteLaporan, getLaporanById, likeLaporan, updateStatus, getAllLaporan } = require('../controllers/laporanController');
const {authentication} = require('../middleware/authMiddleware');
const validateAccount = require('../middleware/accessMiddleware');
const uploadLaporan  = require('../middleware/imageMiddleware');

router.post('/add-laporan', authentication, validateAccount, uploadLaporan('image_laporan').single('image_laporan'), createLaporan)
router.get('/get-laporan/all', authentication, getAllLaporan) 
router.get('/get-laporan', authentication, validateAccount, getLaporan)
router.get('/get-laporan/:id', authentication, validateAccount, getLaporanById) 
router.put('/update-laporan/:id', authentication, validateAccount, uploadLaporan('image_laporan').single('image_laporan'), updateLaporan);
router.delete('/delete-laporan/:id', authentication, validateAccount, deleteLaporan);

router.put('/like/:id', authentication, likeLaporan);
router.put('/status/:id', updateStatus);

module.exports = router;
