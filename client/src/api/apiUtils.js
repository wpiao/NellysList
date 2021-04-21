import ajax from 'superagent';

export const getAds = async () => {
  try {
    const res = await ajax.get('/api/ads');
    return res.body;
  } catch (err) {
    // will make a error component and render it when error happens
    console.log(err);
  }
};

export const postAds = async (ad) => {
  try {
    const res = await ajax.post('/api/ads').send(ad).set('accept', 'json');
    return res.body;
  } catch (err) {
    console.log(err);
  }
};

export const postUpload = async (base64encodedImage) => {
  try {
    const res = await ajax
      .post('/api/upload')
      .send({ data: base64encodedImage })
      .set('accept', 'json');
    console.log('res', res);
    return res.body;
    // TODO: Success alert
  } catch (error) {
    // TODO: Error alert
    console.error(error);
  }
};
