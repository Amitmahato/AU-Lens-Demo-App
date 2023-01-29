import { client } from "../api";
import { defaultProfile } from "../graphql";

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
