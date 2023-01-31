import { client } from "../api";
import {
  createProfileMutation,
  getProfiles,
  searchProfileByHandle,
} from "../graphql";

export const getDefaultProfile = async (address) => {
  const response = await client.query({
    query: getProfiles,
    variables: {
      request: { ownedBy: address },
      forSources: [process.env.NEXT_PUBLIC_APP_ID],
    },
  });

  console.log("getDefaultProfile: ", response);

  const defaultProfile = response?.data?.profiles?.items?.find(
    (profile) => profile.isDefault
  );
  const profileData = defaultProfile ?? response?.data?.profiles?.items?.[0];

  return {
    isLoading: response?.loading ?? false,
    defaultProfile: {
      bio: profileData?.bio,
      handle: profileData?.handle,
      id: profileData?.id,
      name: profileData?.name,
      ownedBy: profileData?.ownedBy,
      stats: {
        postsTotal: profileData?.stats.postsTotal,
      },
    },
  };
};

export const getProfileByHandle = async (handle) => {
  const response = await client.query({
    query: searchProfileByHandle,
    variables: {
      request: {
        type: "PROFILE",
        limit: 1,
        query: handle,
      },
    },
  });

  console.log("getProfileByHandle: ", response);

  const profiles = response?.data?.search?.items;

  return {
    isLoading: response?.loading ?? false,
    profiles,
  };
};

export const createProfile = async (handle, profilePictureUri = null) => {
  try {
    const response = await client.mutate({
      mutation: createProfileMutation,
      variables: {
        request: {
          handle: handle,
          profilePictureUri: profilePictureUri,
        },
      },
    });

    console.log("Response: ", response);

    return {
      isLoading: response?.loading ?? false,
      errors: response.errors,
      data: response.data,
    };
  } catch (error) {
    return { errors: [error.toString()] };
  }
};
