import multer from 'multer'

const storage = multer.diskStorage({
  destination: './public/uploads/hotels',
  filename: (req, file, cb) => {
    cb(null, req.query.htl+"-"+file.originalname);
  }
})

const uploadHotelImage = multer({
  storage,
  limits: { fileSize: 1000000 }
}).any('image');

export { uploadHotelImage }