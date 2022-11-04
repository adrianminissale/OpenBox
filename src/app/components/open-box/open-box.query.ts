import { gql } from 'apollo-angular';

export const OPEN_BOX = gql`
  mutation OpenBox($input: OpenBoxInput!) {
    openBox(input: $input) {
      boxOpenings {
        id
        itemVariant {
          id
          name
          value
        }
      }
    }
  }
`;

export const GET_ITEM_VARIANT = (ID: any) => gql`
  query {
    itemVariant(id: "${ID.openBox.boxOpenings[0].itemVariant.id}") {
      id
      name
      value
      iconUrl
    }
  }
`;
