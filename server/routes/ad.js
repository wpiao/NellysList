const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const jwtClient = require('../bin/jwtClient');
const spreadsheetId = process.env.SPREADSHEET_ID;
const sheets = google.sheets('v4');
const moment = require('moment');
let sheetRange = 'Ads!A2:J';

const findRowById = (rows, id) => {
  rows.forEach((row, index) => {
    if (row[0] === id) {
      // account for first row being the column names
      return index + 2;
    }
  });
  return null;
};

router.put('/', async (req, res, next) => {
  const modifiedDate = moment.utc().format('YYYY-MM-DD HH:mm:ss');
  const {
    id,
    title,
    price,
    description,
    photo,
    condition,
    email,
    zipCode,
  } = req.body;

  const getSheetsReq = {
    auth: jwtClient,
    spreadsheetId: spreadsheetId,
    range: sheetRange,
  };

  try {
    const response = await sheets.spreadsheets.values.get(getSheetsReq);
    return res.json(response.data);
  } catch (err) {
    console.log(err);
  }

  // sheets.spreadsheets.values.get(
  //   {
  //     auth: jwtClient,
  //     spreadsheetId: spreadsheetId,
  //     range: sheetRange,
  //   },
  //   (err, response) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log('Ad retrieved from ' + sheetRange);
  //       const ads = response.data.values;
  //       let rowCounter = 2;
  //       for (let ad of ads) {
  //         if (ad[0] === req.body.id) {
  //           let values = [
  //             [
  //               req.body.id,
  //               title,
  //               price,
  //               description,
  //               photo,
  //               condition,
  //               email,
  //               zipCode,
  //               modifiedDate,
  //             ],
  //           ];
  //           const resource = { values };
  //           return sheets.spreadsheets.values.update(
  //             {
  //               auth: jwtClient,
  //               spreadsheetId: spreadsheetId,
  //               range: `Ads!A${rowCounter}:J${rowCounter}`,
  //               valueInputOption: 'USER_ENTERED',
  //               resource,
  //             },
  //             (err, response) => {
  //               if (err) {
  //                 console.log(err);
  //               } else {
  //                 console.log('ad');
  //                 const ads = response.data.values;
  //                 return res.status(204).json();
  //               }
  //             }
  //           );
  //         }
  //         rowCounter++;
  //       }
  //       return res.status(404).json('Ad Not Found. Please check ID.');
  //     }
  //   }
  // );
});

module.exports = router;
