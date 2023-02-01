import { client } from "../api";
import { createPostTypedData } from "../graphql";

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
