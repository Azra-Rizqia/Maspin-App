const mongoose = require('mongoose');

const BeritaSchema = new mongoose.Schema({
    judul: {
        type: String,
    },
    lokasi: {
        type: String,
        index: 'text',
    },
    kategori: {
        type: String,
    },
    gambar_berita: {
        type: String,
    },
    isi: {
        judul_berita: { type: String },
        deskripsi: { type: String }
    },
}, { timestamps: true });

BeritaSchema.index({ lokasi: 'text', deskripsi: 'text' });

module.exports = mongoose.model('berita', BeritaSchema)