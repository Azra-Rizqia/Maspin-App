const asyncHandler = require('express-async-handler');
const Laporan = require('../models/laporanModel');

const validCategories = ['Lalu Lintas', 'Fasilitas Publik', 'Kebersihan', 'Ketertiban'];
const createLaporan = async (req, res) => {
  try {
    const { kategori_masalah, detail_masalah, lokasi, status, likes } = req.body;
    const userId = req.user.id;
    const laporanName = req.file ? req.file.filename : null;

    if (!kategori_masalah || !detail_masalah || !lokasi) {
      return res.status(400).json({
        success: false,
        message: 'Mohon masukkan data dengan lengkap'
      });
    }

    if (!validCategories.includes(kategori_masalah)) {
      return res.status(400).json({
        success: false,
        message: 'Kategori tidak valid'
      });
    }

    const laporan = await Laporan.create({
      user: userId,
      image_laporan: `${process.env.NGROK_URL}/laporan/${laporanName}`,
      kategori_masalah,
      detail_masalah,
      lokasi,
      status,
      likes,
    });

    if (laporan) {
      res.status(201).json({
        success: true,
        data: {
          _id: laporan.id,
          user: laporan.user,
          image_laporan: laporan.image_laporan,
          kategori_masalah: laporan.kategori_masalah,
          detail_masalah: laporan.detail_masalah,
          lokasi: laporan.lokasi,
          status: laporan.status,
          likes: laporan.likes,
        },
        message: 'Laporan berhasil dibuat',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getLaporan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { kategori_masalah, detail_masalah, page = 1, perPage = 10 } = req.query;

    const filter = { user: userId };
    if (kategori_masalah) filter.kategori_masalah = kategori_masalah;
    if (detail_masalah) filter.detail_masalah = { $regex: new RegExp(detail_masalah, 'i') };

    const totalFiles = await Laporan.countDocuments(filter);

    const laporanList = await Laporan.find(filter, { user: 0 })
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    const totalPages = Math.ceil(totalFiles / perPage);

    if (laporanList.length > 0) {
      res.status(200).json({
        success: true,
        data: laporanList,
        totalFiles,
        message: 'Daftar laporan berhasil diambil',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Laporan tidak ditemukan',
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

const getAllLaporan = async (req, res) => {
  try {
    const { kategori_masalah, detail_masalah } = req.query;
    const filter = {};

    if (kategori_masalah) filter.kategori_masalah = kategori_masalah;
    if (detail_masalah) filter.detail_masalah = { $regex: new RegExp(detail_masalah, 'i') };

    const totalFiles = await Laporan.countDocuments(filter);

    const laporanList = await Laporan.find(filter, { user: 0 });
    if (laporanList.length > 0) {
      res.status(200).json({
        success: true,
        data: laporanList,
        totalFiles,
        message: 'Daftar laporan berhasil diambil',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Laporan tidak ditemukan',
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

const getLaporanById = async (req, res) => {
  try {
    const laporanId = req.params.id;

    const laporan = await Laporan.findById(laporanId, {
      user: 0,
    });

    if (!laporan) {
      return res.status(404).json({
        success: false,
        message: 'Laporan tidak ditemukan',
      });
    }

    res.status(200).json({
      success: true,
      data: laporan,
      message: 'Laporan berhasil diambil',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const updateLaporan = async (req, res) => {
  try {
    const laporanId = req.params.id;
    const { kategori_masalah, detail_masalah, lokasi } = req.body;
    const laporanName = req.file ? req.file.name : null;

    if (!validCategories.includes(kategori_masalah)) {
      return res.status(400).json({
        success: false,
        message: 'Kategori tidak valid'
      });
    }

    const laporan = await Laporan.findByIdAndUpdate(
      laporanId,
      {
        image_laporan: `${process.env.NGROK_URL}/laporan/${laporanName}`,
        kategori_masalah,
        detail_masalah,
        lokasi,
      },
      { new: true }
    );

    if (!laporan) {
      return res.status(404).json({
        success: false,
        message: 'Laporan tidak ditemukan',
      });
    }

    res.status(200).json({
      success: true,
      data: laporan,
      message: 'Laporan berhasil diperbarui',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const deleteLaporan = async (req, res) => {
  try {
    const laporanId = req.params.id;

    const laporan = await Laporan.findByIdAndDelete(laporanId);

    if (!laporan) {
      return res.status(404).json({
        success: false,
        message: 'Laporan tidak ditemukan',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Laporan berhasil dihapus',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const likeLaporan = asyncHandler(async (req, res) => {
  const laporanId = req.params.id;

  try {
    const laporan = await Laporan.findByIdAndUpdate(
      laporanId,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!laporan) {
      return res.status(404).json({
        success: false,
        message: 'Laporan tidak ditemukan',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        _id: laporan.id,
        like: laporan.likes,
      },
      message: 'Like berhasil ditambahkan',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

const updateStatus = async (req, res) => {
  const validateStatus = [1, 2, 3];
  try {
    const laporanId = req.params.id;
    const { status } = req.body;

    if (!validateStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status tidak valid'
      });
    }

    const laporan = await Laporan.findByIdAndUpdate(
      laporanId,
      {
        status
      },
      { new: true }
    );

    if (!laporan) {
      return res.status(404).json({
        success: false,
        message: 'Laporan tidak ditemukan',
      });
    }

    res.status(200).json({
      success: true,
      data: laporan,
      message: 'Status laporan berhasil diperbarui',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createLaporan,
  getLaporan,
  getLaporanById,
  updateLaporan,
  deleteLaporan,
  likeLaporan,
  updateStatus,
  getAllLaporan
}

