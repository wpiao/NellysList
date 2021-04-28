import { gql } from '@apollo/client';

export const GET_ADS = gql`
  query GetAds {
    ads {
      id
      title
      price
      photo
    }
  }
`;

export const GET_AD_BY_ID = gql`
  query GetAdById {
    ad {
      id
      title
      description
      price
      photo
      condition
      email
      zipCode
    }
  }
`;