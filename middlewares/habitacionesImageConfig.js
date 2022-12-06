import multer from 'multer'

const storage = multer.diskStorage({
  destination: './public/uploads/habitaciones',
  filename: (req, file, cb) => {
    cb(null, req.query.hbt+"-"+file.originalname);
  }
})

const uploadHabitacionImage = multer({
  storage,
  limits: { fileSize: 1000000 }
}).any('image');

export { uploadHabitacionImage }