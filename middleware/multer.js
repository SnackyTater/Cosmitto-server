import fs from "fs"
import path from "path"
import multer from "multer"
import {createError} from "#utils/error"

const uploadPath = path.join(__dirname, "../upload")
const acceptMimeType = ["image/png", "image/jpg", "image/jpeg"]

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath)
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_${path.extname(file.originalname)}`
        cb(null, fileName)
    }
})

const fileFilter = (req, file, cb) => {
    if (acceptMimeType.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
        createError({message: "file type not supported"})
    }
}

const limits = {
    fieldSize: "2MB"
}

export default multer({storage, fileFilter, limits})
