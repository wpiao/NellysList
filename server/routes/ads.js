var express = require('express');
var router = express.Router();
let { google } = require('googleapis');
let privatekey = require('../config/client_secret.json');
let jwtClient = new google.auth.JWT(
  privatekey.client_email,
  null,
  privatekey.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);
//authenticate request
jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('Successfully connected to Google Spreadsheet!');
  }
});

let spreadsheetId = process.env.SPREADSHEET_ID;
let sheetRange = 'Ads!A2:J10';
let sheets = google.sheets('v4');

router.get('/', function (req, res, next) {
  sheets.spreadsheets.values.get(
    {
      auth: jwtClient,
      spreadsheetId: spreadsheetId,
      range: sheetRange,
    },
    function (err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
      } else {
        console.log('Ads retrieved from ' + sheetRange);
        var ads = response.data.values;
        var result = [];
        for (ad of ads) {
          result.push({
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
          });
        }
        res.send(result);
      }
    }
  );
});

module.exports = router;
