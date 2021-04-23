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

export const putAds = async (ad) => {
  try {
    const res = await ajax.put('/api/ad').send(ad).set('accept', 'json');
    return res.body;
  } catch (err) {
    console.log(err);
  }
};

export const postUpload = async (base64encodedImage) => {
  let imageUrl = null;
  try {
    const res = await ajax
      .post('/api/upload')
      .send({ data: base64encodedImage })
      .set('accept', 'json');
    console.log('res', res);
    imageUrl = res?.body?.data;
  } catch (error) {
    console.error(error);
  }
  return imageUrl;
};

export const deleteAd = async (id) => {
  try {
    await ajax.delete('/api/ads').query({ id: id });
  } catch (err) {
    console.log(err);
  }
};

export const getLatLngByZipCode = async (zipCode) => {
  const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
  const key = process.env.REACT_APP_GOOGLE_KEY;

  try {
    const res = await ajax.get(`${baseUrl}?address=${zipCode}&key=${key}`);
    return res.body;
  } catch (err) {
    console.log(err);
  }
};
