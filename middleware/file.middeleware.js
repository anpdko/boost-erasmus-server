const multer = require('multer');
const slugify = require('slugify');

const storage = multer.diskStorage({
    destination: './static/images',
    filename: function (req, file, cb) {
        const originalName = file.originalname;
        const safeFileName = slugify(originalName, { lower: true });
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + safeFileName);
    }
});

const types = ['image/png', 'image/jpeg', 'image/jpg'];

const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports = multer({
    storage: storage,
    fileFilter
});
