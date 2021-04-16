const superagent = require('superagent');
require('dotenv').config();

export const getAds = setAds => {
  superagent
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/ads`)
    .then(res => {
      setAds(res.body);
    })
    .catch(err => {
      // will make a error component and render it when error happens
      console.log(err);
    });
}
