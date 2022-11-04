import { gql } from 'apollo-angular';

export const GET_USER = gql`
  query {
    currentUser {
      id
      name
      wallets {
        id
        amount
        currency
      }
    }
  }
`;

export const GET_WALLETS = gql`
  subscription OnUpdateWallet {
    updateWallet {
      wallet {
        id
        amount
        name
      }
    }
  }
`;
