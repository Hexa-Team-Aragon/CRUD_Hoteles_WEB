import multer from 'multer'

const storage = multer.diskStorage({
  destination: './public/uploads/hotels',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

const uploadHotelImage = multer({
  storage,
  limits: { fileSize: 10000000 }
}).any('image');

export { uploadHotelImage }