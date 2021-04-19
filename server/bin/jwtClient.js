const { google } = require('googleapis');
const jwtClient = new google.auth.JWT(
  process.env.CLIENT_EMAIL,
  null,
  process.env.PRIVATE_KEY,
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
