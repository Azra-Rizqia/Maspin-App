const mongoose = require('mongoose');

const PasarSchema = new mongoose.Schema({
    nama_pasar: {
        type: String,
        required: true,
    },
    lokasi_pasar: {
        type: String,
        required: true,
    },
    detail_pasar: {
        type: String,
        required: true,
        default: '0 detail harga pangan',
    },
    gambar_pasar: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('pasar', PasarSchema);