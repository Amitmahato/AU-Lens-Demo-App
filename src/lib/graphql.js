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
  query DefaultProfile(
    $request: DefaultProfileRequest!
    $forSources: [Sources!]!
  ) {
    defaultProfile(request: $request) {
      handle
      id
      name
      ownedBy
      bio
      stats {
        postsTotal(forSources: $forSources)
      }
    }
  }
`;

export const getProfiles = gql`
  query Profiles($request: ProfileQueryRequest!, $forSources: [Sources!]!) {
    profiles(request: $request) {
      items {
        id
        handle
        isDefault
        stats {
          postsTotal(forSources: $forSources)
        }
      }
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

export const createPostTypedData = gql`
  mutation CreatePostTypedData($request: CreatePublicPostRequest!) {
    createPostTypedData(request: $request) {
      typedData {
        domain {
          chainId
          name
          verifyingContract
          version
        }
        types {
          PostWithSig {
            name
            type
          }
        }
        value {
          collectModule
          collectModuleInitData
          contentURI
          deadline
          nonce
          profileId
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
`;

export const explorePublications = gql`
  query ExplorePublications(
    $request: ExplorePublicationRequest!
    $forSources: [Sources!]!
  ) {
    explorePublications(request: $request) {
      pageInfo {
        prev
        next
        totalCount
      }
      items {
        ... on Post {
          appId
          createdAt
          id
          metadata {
            content
            cover {
              original {
                altTag
                url
              }
            }
            description
            image
            mainContentFocus
            name
          }
          profile {
            handle
            id
            name
            picture {
              ... on NftImage {
                uri
                tokenId
              }
              ... on MediaSet {
                original {
                  altTag
                  url
                  mimeType
                }
              }
            }
          }
          stats {
            commentsTotal(forSources: $forSources)
            id
            totalAmountOfCollects
            totalAmountOfComments
            totalAmountOfMirrors
            totalUpvotes
            totalDownvotes
          }
          onChainContentURI
        }
      }
    }
  }
`;
