import { gql } from '@apollo/client';

export const GET_ADS = gql`
  query getAds {
    ads {
      id
      title
      price
      photo
    }
  }
`;

export const GET_AD_BY_ID = gql`
  query getAdById($id: String!) {
    ad(id: $id) {
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
