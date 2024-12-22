const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/users");
  },
  filename: (req, file, cb) => {
    const splittedFile = file.originalname.split(".");
    const fileExt = splittedFile[splittedFile.length - 1]; //jpg, png,...
    const fileName = splittedFile[0].concat("-", Date.now(), ".", fileExt);
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  // FILE TYPE CHECK (fileFilter)
  limits: {
    fileSize: 1000000, //1MB
  },
});

module.exports = { multer, storage, upload };
