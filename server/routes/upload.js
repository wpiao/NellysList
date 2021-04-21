const { cloudinary } = require('../cloudinary/cloudinary');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'nellys_list',
    });
    console.log(uploadResponse);
    res.status(200).json({ message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

module.exports = router;
