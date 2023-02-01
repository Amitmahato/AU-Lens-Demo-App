import { client } from "../api";
import {
  createPostTypedData,
  explorePublications,
  publicationsByProfileId,
} from "../graphql";

export const createPostTypedDataForPost = async (contentURI, profileId) => {
  try {
    const response = await client.mutate({
      mutation: createPostTypedData,
      variables: {
        request: {
          collectModule: {
            freeCollectModule: {
              followerOnly: false,
            },
          },
          referenceModule: {
            followerOnlyReferenceModule: false,
          },
          contentURI: contentURI,
          profileId: profileId,
        },
      },
    });

    console.log("createPostTypedDataForPost: ", response);

    return {
      isLoading: response?.loading ?? false,
      errors: response.errors,
      data: response.data,
    };
  } catch (error) {
    return { errors: [error.toString()] };
  }
};

export const getEveryonePublications = async (cursor) => {
  try {
    const response = await client.mutate({
      mutation: explorePublications,
      variables: {
        request: {
          cursor,
          limit: 10,
          noRandomize: true,
          sortCriteria: "LATEST",
          publicationTypes: "POST",
          sources: [process.env.NEXT_PUBLIC_APP_ID],
        },
        forSources: [process.env.NEXT_PUBLIC_APP_ID],
      },
    });

    console.log("getEveryonePublications: ", response);

    return {
      isLoading: response?.loading ?? false,
      errors: response.errors,
      data: { publications: response.data.explorePublications },
    };
  } catch (error) {
    return { errors: [error.toString()] };
  }
};

export const getPublicationByProfileId = async (cursor, profileId) => {
  console.log(cursor, profileId);
  try {
    const response = await client.mutate({
      mutation: publicationsByProfileId,
      variables: {
        request: {
          cursor: cursor,
          limit: 10,
          profileId: profileId,
          publicationTypes: "POST",
          sources: [process.env.NEXT_PUBLIC_APP_ID],
        },
      },
    });

    console.log("getPublicationByProfileId: ", response);

    return {
      isLoading: response?.loading ?? false,
      errors: response.errors,
      data: response.data,
    };
  } catch (error) {
    return { errors: [error.toString()] };
  }
};
