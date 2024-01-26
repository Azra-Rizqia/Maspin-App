const asyncHandler = require('express-async-handler');
const Berita = require('../models/beritaModel');

const createBerita = async (req, res) => {
    try {
        const { judul, lokasi, kategori } = req.body;
        const gambarBerita = req.file ? req.file.filename : null;

        const isiBerita = {
            judul_berita: req.body.isi ? req.body.isi.judul_berita : null,
            deskripsi: req.body.isi ? req.body.isi.deskripsi : null,
        };

        const berita = await Berita.create({
            judul,
            lokasi,
            kategori,
            gambar_berita: `${process.env.NGROK_URL}/berita/${gambarBerita}`,
            isi: isiBerita,
        });

        if (berita) {
            res.status(201).json({
                success: true,
                data: berita,
                message: 'Berita berhasil dibuat',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const getAllBerita = asyncHandler(async (req, res) => {
    const beritaList = await Berita.find();

    res.status(200).json({
        success: true,
        data: beritaList,
        message: 'Daftar berita berhasil diambil',
    });
});

module.exports = {
    createBerita,
    getAllBerita,
};
