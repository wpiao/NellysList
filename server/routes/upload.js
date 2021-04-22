const { cloudinary } = require('../cloudinary/cloudinary');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'nellys_list',
    });
    res.status(201).json({
      message: 'Image Successfully Uploaded',
      data: uploadResponse.url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
