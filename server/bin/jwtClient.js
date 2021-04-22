const { google } = require('googleapis');
const { Base64 } = require('js-base64');
const utf8 = require('utf8');
const credentials = process.env.CREDENTIALS;
const bytes = Base64.decode(credentials);
const text = utf8.decode(bytes);
const final_credentials = JSON.parse(text);

const jwtClient = new google.auth.JWT(
  final_credentials.client_email,
  null,
  final_credentials.private_key,
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
