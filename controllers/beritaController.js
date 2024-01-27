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
            gambar_berita: `${process.env.BASE_URL}/berita/${gambarBerita}`,
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

const updateBerita = async (req, res) => {
    try {
        const beritaId = req.params.id;
        const { judul, lokasi, kategori } = req.body;
        const gambarBerita = req.file ? req.file.filename : null;

        const isiBerita = {
            judul_berita: req.body.isi ? req.body.isi.judul_berita : null,
            deskripsi: req.body.isi ? req.body.isi.deskripsi : null,
        };

        const berita = await Berita.findByIdAndUpdate(
            beritaId,
            {
                judul: judul,
                lokasi: lokasi,
                kategori: kategori,
                gambar_berita: gambarBerita
                    ? `${process.env.BASE_URL}/berita/${gambarBerita}`
                    : berita.gambar_berita,
                isi: isiBerita,
            },
            { new: true }
        );

        if (!berita) {
            return res.status(404).json({
                success: false,
                message: 'Berita tidak ditemukan',
            });
        }

        res.status(200).json({
            success: true,
            data: berita,
            message: 'Berita berhasil diperbarui',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const getAllBerita = async (req, res) => {
    try {
        let query = {};

        if (req.query.kategori) {
            query.kategori = req.query.kategori;
        }

        if (req.query.judul) {
            query.judul = { $regex: new RegExp(req.query.judul, 'i') };
        }

        if (req.query.keywords) {
            query['isi.deskripsi'] = { $regex: new RegExp(req.query.keywords, 'i') };
        }

        const beritaList = await Berita.find(query);

        if (beritaList.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Berita tidak ditemukan',
            });
        }

        res.status(200).json({
            success: true,
            data: beritaList,
            message: 'Daftar berita berhasil diambil',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const getBeritaById = async (req, res) => {
    try {
        const berita = await Berita.findById(req.params.id);

        if (berita) {
            res.status(200).json({
                success: true,
                data: berita,
                message: 'Berita berhasil diambil',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Berita tidak ditemukan',
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

module.exports = {
    createBerita,
    updateBerita,
    getAllBerita,
    getBeritaById,
};
