import { client } from "../api";
import { authenticate, challenge } from "../graphql";

export const generateChallenge = async (address) => {
  const response = await client.query({
    query: challenge,
    variables: { address },
  });

  console.log("generateChallenge: ", response);
  return {
    isLoading: response?.loading ?? false,
    challenge: response?.data?.challenge,
  };
};

export const sendSignedMessage = async ({ address, signature }) => {
  const response = await client.mutate({
    mutation: authenticate,
    variables: {
      request: {
        address,
        signature,
      },
    },
  });

  const data = response?.data?.authenticate;
  console.log("sendSignedMessage: ", data);
  return {
    authenticate: {
      accessToken: data?.accessToken,
      refreshToken: data?.refreshToken,
    },
  };
};
