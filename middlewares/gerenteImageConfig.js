import multer from 'multer'

const storage = multer.diskStorage({
  destination: './public/uploads/gerentes',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

const uploadGerenteImage = multer({
  storage,
  limits: { fileSize: 10000000 }
}).any('image') //Arioksillo, en el video dice que aqui le ponga single pa que nomas sea una imagen pero si le pongo single me sale este error MulterError: Unexpected field pero si le dejo any si jala y nomas me deja escoger una

export { uploadGerenteImage }
