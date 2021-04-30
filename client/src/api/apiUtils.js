import ajax from 'superagent';

export const postUpload = async (base64encodedImage) => {
  let imageUrl = null;
  try {
    const res = await ajax
      .post('/api/upload')
      .send({ data: base64encodedImage })
      .set('accept', 'json');
    imageUrl = res?.body?.data;
  } catch (error) {
    console.error(error);
  }
  return imageUrl;
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
