const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/admin.middleware')
const file = require('../middleware/file.middeleware')


const upload = file.single('imgCover')
router.post('/upload/img', verifyToken, upload, (req, res) => {
    try {
      res.json(req.file.filename)
    }
    catch(err){
      res.status(400).json({ message: 'Failed to load cover'})
    }
})

module.exports = router;