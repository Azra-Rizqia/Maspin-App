const multer = require('multer');
const path = require('path');

const storage = (tipeUpload) => multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;
    if (tipeUpload === 'ktp') {
      uploadPath = path.join(__dirname, '../storage/ktp');
    } else if (tipeUpload === 'image_laporan') {
      uploadPath = path.join(__dirname, '../storage/laporan');
    } else if (tipeUpload === 'gambar_pasar') {
      uploadPath = path.join(__dirname, '../storage/pasar');
    } else if (tipeUpload === 'gambar_barang') {
      uploadPath = path.join(__dirname, '../storage/pasar');
    } else if (tipeUpload === 'gambar_berita') {
      uploadPath = path.join(__dirname, '../storage/berita');
    } else {
      return cb('Error: Tipe upload tidak valid!');
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, 'image_' + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|svg/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Hanya file gambar (jpeg, jpg, png) yang diizinkan!');
  }
};

const uploadImage = (tipeUpload) => multer({
  storage: storage(tipeUpload),
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = uploadImage;