const { google } = require('googleapis');
const privatekey = require('../config/client_secret.json');
const jwtClient = new google.auth.JWT(
  privatekey.client_email,
  null,
  privatekey.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

//authenticate request
jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully connected to Google Spreadsheet!');
  }
});

module.exports = jwtClient;
