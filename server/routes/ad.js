const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const jwtClient = require('../bin/jwtClient');
const spreadsheetId = process.env.SPREADSHEET_ID;
const sheets = google.sheets('v4');
const moment = require('moment');
let sheetRange = 'Ads!A2:J';

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

  const sheetsReq = {
    auth: jwtClient,
    spreadsheetId: spreadsheetId,
  };

  // Helper method for processing data
  const findRowById = async (rows, id) => {
    let processedData = null;

    rows.forEach((row, index) => {
      // Match found
      if (row[0] === id) {
        // Row is found at index + 2 to account for first row of column headers
        const row = index + 2;

        const values = [
          [
            id,
            title,
            price,
            description,
            photo,
            condition,
            email,
            zipCode,
            modifiedDate,
          ],
        ];

        processedData = {
          resource: { values },
          sheetRange: `Ads!A${row}:J${row}`,
        };
      }
    });

    if (processedData === null) {
      throw Error('No matching ID found');
    }

    return processedData;
  };

  try {
    // GET all rows in sheet
    const getRes = await sheets.spreadsheets.values.get({
      ...sheetsReq,
      range: sheetRange,
    });

    // Process response to set up following PUT request
    const processedData = await findRowById(getRes.data.values, id);

    // PUT row in sheet with desired row values and sheetrange
    const putSheetsRes = await sheets.spreadsheets.values.update({
      ...sheetsReq,
      range: processedData.sheetRange,
      valueInputOption: 'USER_ENTERED',
      resource: processedData.resource,
    });

    if (putSheetsRes.status !== 200) {
      throw Error('Something went wrong. Please try again.');
    }

    return res.status(204).json();
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
