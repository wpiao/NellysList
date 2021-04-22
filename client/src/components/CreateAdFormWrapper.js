import React from 'react';
import { CreateAdForm } from './CreateAdForm';
import { getAds, putAds } from '../api/apiUtils';
import { useAlert } from 'react-alert';
// import SpinnerWrapper from './SpinnerWrapper';
import { useParams } from 'react-router-dom';
import { useGetAds } from '../hooks/useGetAds';

export const CreateAdFormWrapper = ({ currentAd }) => {
  const { setAds } = useGetAds();
  // const [isLoading, setLoading] = useState(false);
  const alert = useAlert();
  const { id } = useParams();

  const updateAd = async (ad, e) => {
    // TODO: PUT call to BE
    try {
      // PUT ads
      await putAds(ad);
      // GET ads
      const res = await getAds();
      // Success alert
      alert.show('Successfully Saved!', { type: 'success' });
      e.target.reset();
      setAds(res);
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
