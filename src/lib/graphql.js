import { gql } from "@apollo/client";

export const challenge = gql`
  query Challenge($address: EthereumAddress!) {
    challenge(request: { address: $address }) {
      text
    }
  }
`;

export const authenticate = gql`
  mutation Authenticate($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }
`;

export const refreshDocument = gql`
  mutation Refresh($request: RefreshRequest!) {
    refresh(request: $request) {
      accessToken
      refreshToken
    }
  }
`;

export const defaultProfile = gql`
  query DefaultProfile($request: DefaultProfileRequest!) {
    defaultProfile(request: $request) {
      handle
      id
      name
      ownedBy
      bio
    }
  }
`;

export const searchProfileByHandle = gql`
  query Search($request: SearchQueryRequest!) {
    search(request: $request) {
      ... on ProfileSearchResult {
        items {
          id
          handle
        }
      }
    }
  }
`;

export const createProfileMutation = gql`
  mutation CreateProfile($request: CreateProfileRequest!) {
    createProfile(request: $request) {
      ... on RelayerResult {
        txHash
        txId
      }
      ... on RelayError {
        reason
      }
    }
  }
`;
