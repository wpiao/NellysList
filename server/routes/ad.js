const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const jwtClient = require('../bin/jwtClient');
const spreadsheetId = process.env.SPREADSHEET_ID;
const sheets = google.sheets('v4');
const moment = require('moment');
let sheetRange = 'Ads!A2:J';

router.put('/', async (req, res, next) => {
  res.status(200).json('Test');
});

module.exports = router;
