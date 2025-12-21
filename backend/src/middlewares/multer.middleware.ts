import multer from "multer";
import path from 'node:path';
import fs from 'node:fs'

const uploadsPath = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true })
}

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads")
  },

  filename: (req, file, cb) => {
    const name = Date.now() + "-" + crypto.randomUUID();
    cb(null, name + path.extname(file.originalname))
  }

})

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {

  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error("Solo se permiten imágenes."))
  }
}

const upload = multer({ storage, fileFilter });

export { uploadsPath, upload }