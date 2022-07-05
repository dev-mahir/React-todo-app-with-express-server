
const multer  = require( 'multer') 
const path  = require( 'path'); 


const uploadFolder = path.join(__dirname + '/uploads/');

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, uploadFolder)
    },
    filename(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      )
    },
  })
  
  function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/ // Choose Types you want...
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
  
    if (extname && mimetype) {
      return cb(null, true)
    } else {
      cb('Images only!') // custom this message to fit your needs
    }
  }
  
  const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
    },
  })
  

  module.exports = upload;