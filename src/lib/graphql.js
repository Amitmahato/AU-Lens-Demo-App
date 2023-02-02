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
    $reactionRequest2: ReactionFieldResolverRequest
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
            isFollowedByMe
            isFollowing
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
          reaction(request: $reactionRequest2)
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

export const SingleUserProfileByHandle = gql`
  query Profile(
    $request: SingleProfileQueryRequest!
    $forSources: [Sources!]!
    $mirrorsTotalForSources2: [Sources!]!
    $postsTotalForSources2: [Sources!]!
    $publicationsTotalForSources2: [Sources!]!
  ) {
    profile(request: $request) {
      coverPicture {
        ... on MediaSet {
          original {
            url
          }
        }
      }
      dispatcher {
        address
        canUseRelay
      }
      followNftAddress
      handle
      id
      bio
      interests
      isFollowedByMe
      isFollowing
      name
      metadata
      ownedBy
      stats {
        totalFollowers
        totalFollowing
        id
        commentsTotal(forSources: $forSources)
        totalCollects
        mirrorsTotal(forSources: $mirrorsTotalForSources2)
        postsTotal(forSources: $postsTotalForSources2)
        publicationsTotal(forSources: $publicationsTotalForSources2)
      }
      picture {
        ... on MediaSet {
          original {
            url
          }
        }
      }
    }
  }
`;

export const publicationsByProfileId = gql`
  query Publications(
    $request: PublicationsQueryRequest!
    $reactionRequest2: ReactionFieldResolverRequest
  ) {
    publications(request: $request) {
      items {
        ... on Post {
          appId
          metadata {
            content
            image
            mainContentFocus
            name
            media {
              original {
                altTag
                url
              }
            }
          }
          reaction(request: $reactionRequest2)
          stats {
            totalAmountOfCollects
            totalAmountOfComments
            totalAmountOfMirrors
            totalUpvotes
            totalDownvotes
          }
          createdAt
          id
          profile {
            id
            name
            handle
            picture {
              ... on MediaSet {
                original {
                  altTag
                  url
                }
              }
            }
          }
        }
      }
      pageInfo {
        next
        prev
        totalCount
      }
    }
  }
`;

export const createFollowTypedData = gql`
  mutation createFollowTypedData($request: FollowRequest!) {
    createFollowTypedData(request: $request) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          FollowWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          profileIds
          datas
        }
      }
    }
  }
`;

export const addReactionToPost = gql`
  mutation AddReaction($request: ReactionRequest!) {
    addReaction(request: $request)
  }
`;
