const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const DetailPasar = require('../models/detailPasarModel')
const Pasar = require('../models/pasarModel')

const createDetailPasar = asyncHandler(async (req, res) => {
    const pasarId = req.params.pasarId;

    const { nama_barang, harga_barang, satuan } = req.body;
    const gambarBarang = req.file ? req.file.filename : null;

    const pasar = await Pasar.findById(pasarId);
    if (!pasar) {
        return res.status(404).json({
            success: false,
            message: 'Pasar tidak ditemukan',
        });
    }

    const detailPasar = await DetailPasar.create({
        pasar: pasarId,
        nama_barang,
        harga_barang,
        satuan,
        gambar_barang: `${process.env.BASE_URL}/pasar/${gambarBarang}`,
    });

    res.status(201).json({
        success: true,
        data: detailPasar,
        message: 'Detail Pasar berhasil dibuat',
    });
});

const getDetailPasar = asyncHandler(async (req, res) => {
    try {
        const pasarId = req.params.pasarId;

        if (!mongoose.Types.ObjectId.isValid(pasarId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid pasarId format',
            });
        }

        const { nama_barang } = req.query;
        let filter = { pasar: pasarId };
        if (nama_barang) {
            filter.nama_barang = { $regex: new RegExp(nama_barang, 'i') };
        }

        const detailPasarList = await DetailPasar.find(filter);

        res.status(200).json({
            success: true,
            data: detailPasarList,
            message: 'Daftar detail pasar berhasil diambil',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

const updateDetailPasar = asyncHandler(async (req, res) => {
    try {
        const pasarId = req.params.pasarId;
        const detailPasarId = req.params.detailPasarId;

        const { nama_barang, harga_barang, satuan } = req.body;
        const gambarBarang = req.file ? req.file.filename : null;

        const pasar = await Pasar.findById(pasarId);
        if (!pasar) {
            return res.status(404).json({
                success: false,
                message: 'Pasar tidak ditemukan',
            });
        }

        const detailPasar = await DetailPasar.findByIdAndUpdate(
            detailPasarId,
            {
                nama_barang,
                harga_barang,
                satuan,
                gambar_barang: `${process.env.BASE_URL}/pasar/${gambarBarang}`,
            },
            { new: true }
        );

        if (!detailPasar) {
            return res.status(404).json({
                success: false,
                message: 'Detail Pasar tidak ditemukan',
            });
        }

        res.status(200).json({
            success: true,
            data: detailPasar,
            message: 'Detail Pasar berhasil diperbarui',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

module.exports = {
    createDetailPasar,
    getDetailPasar,
    updateDetailPasar,
};