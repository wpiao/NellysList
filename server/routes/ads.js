const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const jwtClient = require('../bin/jwtClient.js');
const spreadsheetId = process.env.SPREADSHEET_ID;
const sheets = google.sheets('v4');
const uuidv4 = require('uuid').v4;
const moment = require('moment');
let sheetRange = 'Ads!A2:J';

// get all ads
router.get('/', (req, res, next) => {
  let id = req.query.id;
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
        let result;
        // if ID query param exists, filter for that id only.
        if (id) {
          result = ads.filter((ad) => {
            if (ad[0] === id) {
              return ad;
            }
          });
        } else {
          result = ads.map((ad) => {
            return {
              id: ad[0],
              title: ad[1],
              price: ad[2],
              description: ad[3],
              photo: ad[4],
              condition: ad[5],
              email: ad[6],
              zipCode: ad[7],
              modifiedDate: ad[8],
              createdDate: ad[9],
            };
          });
        }
        res.send(result);
      }
    }
  );
});

// post new ad
router.post('/', async (req, res, next) => {
  const now = moment.utc().format('YYYY-MM-DD HH:mm:ss');
  const createdDate = now;
  const modifiedDate = now;
  const {
    title,
    price,
    description,
    photo,
    condition,
    email,
    zipCode,
  } = req.body;
  if (req.body.id) {
    res
      .status(400)
      .json({ error: 'Remove id from request body and try again.' });
  }
  const id = uuidv4();

  const sheetsRequest = {
    spreadsheetId: spreadsheetId,
    range: sheetRange,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      majorDimension: 'ROWS',
      values: [
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
          createdDate,
        ],
      ],
    },
    auth: jwtClient,
  };
  try {
    const response = (await sheets.spreadsheets.values.append(sheetsRequest))
      .data;
    res.status(200).json({
      id: id,
    });
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

module.exports = router;
