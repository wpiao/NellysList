const superagent = require('superagent');
require('dotenv').config();

export const getAds = setAds => {
  superagent
    .get(`${process.env.REACT_APP_BACKEND_URL}`)
    .then(res => {
      console.log(res);
      // setAds(res.body);
    })
    .catch(err => {
      // will make a error component and render it when error happens
      console.log(err);
    });
}
