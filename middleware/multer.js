const fs = require("fs") 
const path = require("path") 
const multer = require("multer") 
const { createError } = require("#utils/error.js") 

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

exports.default = multer({storage, fileFilter, limits})
