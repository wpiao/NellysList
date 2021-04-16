const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const jwtClient = require('../bin/jwtClient.js');
const spreadsheetId = process.env.SPREADSHEET_ID;
const sheets = google.sheets('v4');
let sheetRange = 'Ads!A:J';

router.get('/', (req, res, next) => {
  sheets.spreadsheets.values.get(
    {
      auth: jwtClient,
      spreadsheetId: spreadsheetId,
      range: sheetRange,
    },
    (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
      } else {
        console.log('Ads retrieved from ' + sheetRange);
        const ads = response.data.values;
        objs = ads.map((ad) => {
          return {
            id: ad[0],
            title: ad[1],
            price: ad[2],
            description: ad[3],
            photo: ad[4],
            condition: ad[5],
            email: ad[6],
            zipCode: ad[7],
            createdDate: ad[8],
            modifiedDate: ad[9],
          };
        });
        res.send(objs);
      }
    }
  );
});

router.post('/', async (req, res, next) => {
  reqData = req.body;
  const sheetsRequest = {
    spreadsheetId: spreadsheetId,
    range: sheetRange,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      majorDimension: 'ROWS',
      values: [
        [
          reqData.id,
          reqData.title,
          reqData.price,
          reqData.description,
          reqData.photo,
          reqData.condition,
          reqData.email,
          reqData.zipCode,
        ],
      ],
    },
    auth: jwtClient,
  };
  try {
    const response = (await sheets.spreadsheets.values.append(sheetsRequest))
      .data;
    res.send(200);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

module.exports = router;
