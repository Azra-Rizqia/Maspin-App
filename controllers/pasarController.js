const asyncHandler = require('express-async-handler');
const Pasar = require('../models/pasarModel')

const createPasar = async (req, res) => {
    try {
        const { nama_pasar, lokasi_pasar, detail_pasar } = req.body;
        const gambarPasar = req.file ? req.file.filename : null;

        const pasar = await Pasar.create({
            nama_pasar,
            lokasi_pasar,
            detail_pasar,
            gambar_pasar: `${process.env.NGROK_URL}/pasar/${gambarPasar}`,
        });

        if (pasar) {
            res.status(201).json({
                success: true,
                data: pasar,
                message: 'Pasar berhasil dibuat',
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

const getAllPasar = asyncHandler(async (req, res) => {
    const pasarList = await Pasar.find();

    res.status(200).json({
        success: true,
        data: pasarList,
        message: 'Daftar pasar berhasil diambil',
    });
});

module.exports = {
    createPasar,
    getAllPasar,
};
