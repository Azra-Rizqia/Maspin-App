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
            gambar_pasar: `${process.env.BASE_URL}/pasar/${gambarPasar}`,
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

const updatePasar = async (req, res) => {
    try {
      const pasarId = req.params.id;
      const { nama_pasar, lokasi_pasar, detail_pasar } = req.body;
      const gambarPasar = req.file ? req.file.filename : null;
  
      const updatedPasar = await Pasar.findByIdAndUpdate(
        pasarId,
        {
          nama_pasar,
          lokasi_pasar,
          detail_pasar,
          gambar_pasar: gambarPasar
            ? `${process.env.BASE_URL}/pasar/${gambarPasar}`
            : null,
        },
        { new: true } 
      );
  
      if (!updatedPasar) {
        return res.status(404).json({
          success: false,
          message: 'Pasar tidak ditemukan',
        });
      }
  
      res.status(200).json({
        success: true,
        data: updatedPasar,
        message: 'Pasar berhasil diperbarui',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };  

const getAllPasar = async (req, res) => {
    try {
        const { nama_pasar } = req.query;
        let filter = {};

        if (nama_pasar) {
            filter.nama_pasar = { $regex: new RegExp(nama_pasar, 'i') };
        }

        const pasarList = await Pasar.find(filter);

        res.status(200).json({
            success: true,
            data: pasarList,
            message: 'Daftar pasar berhasil diambil',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const getPasarById = async (req, res) => {
    try {
        const pasar = await Pasar.findById(req.params.id);

        if (pasar) {
            res.status(200).json({
                success: true,
                data: pasar,
                message: 'Data pasar berhasil diambil',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Pasar tidak ditemukan',
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
    createPasar,
    updatePasar,
    getAllPasar,
    getPasarById,
};
