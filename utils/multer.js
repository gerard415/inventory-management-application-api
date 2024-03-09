const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const storage = multer.memoryStorage()

const fileFilter = (req, file, callback) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if(allowedTypes.includes(file.mimetype)) {
        callback(null, true)
    }else(
        callback(null, false)
    )
}

const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const dm = decimal || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return (
      parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
    );
};

const photoMiddleware = multer({storage, fileFilter})

module.exports = {photoMiddleware, fileSizeFormatter}