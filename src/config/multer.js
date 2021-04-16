const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "../public/uploads"));
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}${file.originalname}`);
	},
});

function checkFileType(file, cb) {
	const acceptedExt = /jpg|jpeg|png/;
	const extMatch = acceptedExt.test(path.extname(file.originalname).toLowerCase());
	const mimeTypeMatch = acceptedExt.test(file.mimetype); //We wanna check the image mimeType too

	if (extMatch && mimeTypeMatch) {
		return cb(null, true);
	} else {
		cb("Images only");
	}
}

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => checkFileType(file, cb),
});

module.exports = upload;
