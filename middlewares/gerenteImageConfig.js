import multer from 'multer'

const storage = multer.diskStorage({
  destination: './public/uploads/gerentes',
  filename: (req, file, cb) => {
    cb(null, req.query.grt+"-"+file.originalname)
  }
})

const uploadGerenteImage = multer({
  storage,
  limits: { fileSize: 10000000 }
}).any('image')

export { uploadGerenteImage }
