import multer from 'multer'

const storage = multer.diskStorage({
  destination: './public/uploads/habitaciones',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

const uploadHabitacionImage = multer({
  storage,
  limits: { fileSize: 10000000 }
}).any('image');

export { uploadHabitacionImage }