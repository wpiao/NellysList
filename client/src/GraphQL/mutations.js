import { gql } from '@apollo/client';

export const CREATE_AD = gql`
  mutation createAd(
    $title: String!
    $description: String!
    $price: Int
    $photo: String
    $condition: String!
    $email: String!
    $zipCode: String!
  ) {
    createAd(
      title: $title
      description: $description
      price: $price
      photo: $photo
      condition: $condition
      email: $email
      zipCode: $zipCode
    ) {
      id
      title
      description
      price
      photo
      condition
      email
      zipCode
      createdDate
      modifiedDate
    }
  }
`;

export const UPDATE_AD = gql`
  mutation updateAd(
    $id: String!
    $title: String!
    $description: String!
    $price: Int
    $photo: String
    $condition: String!
    $email: String!
    $zipCode: String!
  ) {
    updateAd(
      id: $id
      title: $title
      description: $description
      price: $price
      photo: $photo
      condition: $condition
      email: $email
      zipCode: $zipCode
    ) {
      id
      title
      description
      price
      photo
      condition
      email
      zipCode
      modifiedDate
    }
  }
`;

export const DELETE_AD = gql`
  mutation deleteAd($id: String!) {
    deleteAd(id: $id) {
      id
      title
      price
      description
      photo
      condition
      email
      zipCode
      modifiedDate
    }
  }
`;
