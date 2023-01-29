import { client } from "../api";
import {
  createProfileMutation,
  defaultProfile,
  searchProfileByHandle,
} from "../graphql";

export const getDefaultProfile = async (address) => {
  const response = await client.query({
    query: defaultProfile,
    variables: { request: { ethereumAddress: address } },
  });

  console.log("getDefaultProfile: ", response);

  const profileData = response?.data?.defaultProfile;

  return {
    isLoading: response?.loading ?? false,
    defaultProfile: {
      bio: profileData?.bio,
      handle: profileData?.handle,
      id: profileData?.id,
      name: profileData?.name,
      ownedBy: profileData?.ownedBy,
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
