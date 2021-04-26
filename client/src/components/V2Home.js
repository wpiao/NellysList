import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { V2AdDeck } from './V2AdDeck';
// import { CreateAdForm } from './CreateAdForm';
// import { CreateAdFormWrapper } from './CreateAdFormWrapper';
// import { useGetAds } from '../hooks/useGetAds';
import SpinnerWrapper from './SpinnerWrapper';
// import { AdDetails } from './AdDetails';
// import { useAlert } from 'react-alert';
// import { postAds, getAds, postUpload } from '../api/apiUtils';
// import { Search } from './Search';

export const V2Home = () => {
  const isLoading = false;
  // const { ads, setAds, isLoading, searched, setSearched } = useGetAds();
  // const [ad, setAd] = useState({});
  // const [currentAd, setCurrentAd] = useState({});
  // const alert = useAlert();
  // const [isLoadingPOST, setLoadingPOST] = useState(false);
  // const [input, setInput] = useState('');

  // const createAd = async (ad, base64encodedImage, selectedFile) => {
  //   setLoadingPOST(true);

  //   if (selectedFile) {
  //     // First, attempt to upload image
  //     const imageUrl = await postUpload(base64encodedImage);
  //     ad.photo = imageUrl ? imageUrl : null;
  //   }

  //   try {
  //     // POST ads
  //     await postAds(ad);
  //     // GET ads
  //     const res = await getAds();
  //     // Success alert
  //     alert.show('Successfully Saved!', { type: 'success' });
  //     setAds(res);
  //   } catch (error) {
  //     // Error alert
  //     alert.show('Something Went Wrong!', { type: 'error' });
  //     console.log(error);
  //   }
  //   setLoadingPOST(false);
  // };

  // const handleUpdateAds = (ads) => {
  //   setAds(ads);
  // };

  // const handleSearchAds = (e) => {
  //   const val = e.target.value;
  //   const filtered = searched.filter((ad) => {
  //     return ad.title.toLowerCase().includes(val.toLowerCase());
  //   });
  //   setInput(val);
  //   setAds(filtered);
  // };

  return isLoading ? (
    <SpinnerWrapper isLoading={isLoading} />
  ) : (
    <Switch>
      <Route
        path="/"
        exact
        children={
          <>
            {/* <Search input={input} onHandleSearch={handleSearchAds} /> */}
            <V2AdDeck />
          </>
        }
      />
      {/* <Route
        path="/ads/create"
        children={
          <CreateAdForm handleSubmit={createAd} isLoadingPOST={isLoadingPOST} />
        }
      />
      <Route
        path="/ad/:id"
        exact
        children={
          <AdDetails
            ad={ad}
            setCurrentAd={setCurrentAd}
            updateAds={handleUpdateAds}
          />
        }
      />
      <Route
        path="/ad/:id/edit"
        exact
        children={
          <CreateAdFormWrapper
            currentAd={currentAd}
            updateAds={handleUpdateAds}
          />
        }
      /> */}
    </Switch>
  );
};
