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
router.get('/', async (req, res, next) => {
  let id = req.query.id;
  const processData = async (data) => {
    return data.map((ad) => {
      // remove all non decimal / digits and convert to number
      const price = ad[2] ? Number(ad[2].replace(/[^0-9.-]+/g, '')) : null;
      return {
        id: ad[0],
        title: ad[1],
        price: price,
        description: ad[3],
        photo: ad[4],
        condition: ad[5],
        email: ad[6],
        zipCode: ad[7],
        modifiedDate: ad[8],
        createdDate: ad[9],
      };
    });
  };

  const getRes = await sheets.spreadsheets.values.get({
    auth: jwtClient,
    spreadsheetId: spreadsheetId,
    range: sheetRange,
  });

  let result = await processData(getRes.data.values);

  if (!id) {
    res.status(200).json({ data: { ads: result } });
  } else {
    result = result.filter((item) => {
      if (item.id === id) {
        return item;
      }
    });
    if (result.length === 0) {
      res.status(404).json('Ad not found. Please check your id.');
    } else {
      res.status(200).json({ data: { ads: result } });
    }
  }
});

// delete ad
router.delete('/', async (req, res, next) => {
  let id = req.query.id;

  const findRowById = async (data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === id) {
        return i;
      }
    }
  };

  const getRes = await sheets.spreadsheets.values.get({
    auth: jwtClient,
    spreadsheetId: spreadsheetId,
    range: sheetRange,
  });

  const rowToDelete = await findRowById(getRes.data.values);
  if (rowToDelete) {
    await sheets.spreadsheets.batchUpdate({
      auth: jwtClient,
      spreadsheetId: spreadsheetId,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0,
                dimension: 'ROWS',
                startIndex: rowToDelete + 1,
                endIndex: rowToDelete + 2,
              },
            },
          },
        ],
      },
    });
    res.status(204).json();
  } else {
    res.status(404).json({ error: 'ID not found.' });
  }
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
