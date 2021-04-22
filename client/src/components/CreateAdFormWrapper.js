import React, { useEffect } from 'react';
import { CreateAdForm } from './CreateAdForm';
import { getAds, putAds, postUpload } from '../api/apiUtils';
import { useAlert } from 'react-alert';
// import SpinnerWrapper from './SpinnerWrapper';
import { useParams, useHistory } from 'react-router-dom';
export const CreateAdFormWrapper = ({ currentAd, updateAds }) => {
  // const [isLoading, setLoading] = useState(false);
  const alert = useAlert();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(currentAd).length === 0) {
      history.push('/');
    }
  }, []);

  const updateAd = async (ad, base64encodedImage, selectedFile) => {
    if (ad.photo && selectedFile !== null) {
      const imageUrl = await postUpload(base64encodedImage);
      ad.photo = imageUrl ? imageUrl : null;
    }

    try {
      // PUT ads
      await putAds(ad);
      // GET ads
      const res = await getAds();
      // Success alert
      alert.show('Successfully Saved!', { type: 'success' });
      // e.target.reset();
      updateAds(res);
    } catch (error) {
      // Error alert
      alert.show('Something Went Wrong!', { type: 'error' });
      console.log(error);
    }
  };

  return (
    <>
      {/* <SpinnerWrapper isLoading={isLoading} /> */}
      <CreateAdForm id={id} handleSubmit={updateAd} currentAd={currentAd} />
    </>
  );
};
