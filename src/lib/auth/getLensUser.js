import { readAccessToken } from "../helper";
import { getDefaultProfile } from "./profile";

export const getLensUser = async (address) => {
  if (!address) {
    return {
      isSignedInQuery: null,
      profileQuery: null,
    };
  }

  const localStorageQuery = readAccessToken();

  //   If there is a connected address, we can ask for lens profile
  const profileQuery = await getDefaultProfile(address);

  // contains information about both the localStorageQuery
  // and the information about lens profile
  return {
    isSignedInQuery: localStorageQuery,
    profileQuery,
  };
};
