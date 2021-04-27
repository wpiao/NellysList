import { gql } from '@apollo/client';

export const GET_ADS = gql`
  query GetAds {
    ads {
      id
      title
      description
      price
      photo
      condition
      email
      zipCode
      modifiedDate
      createdDate
    }
  }
`;