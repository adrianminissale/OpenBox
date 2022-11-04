import { gql } from 'apollo-angular';

export const GET_BOX = (ID: string) => gql`
  query {
    box(id: "${ID}") {
      id
      name
      iconUrl
      cost
      openable
    }
  }
`;
