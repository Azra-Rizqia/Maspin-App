const mongoose = require('mongoose');

const DetailPasarSchema = new mongoose.Schema({
    pasar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pasar',
        required: true,
    },
    nama_barang: {
        type: String,
        required: true,
    },
    harga_barang: {
        type: String,
        required: true,
    },
    satuan: {
        type: String,
        required: true,
    },
    gambar_barang: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('detailPasar', DetailPasarSchema)