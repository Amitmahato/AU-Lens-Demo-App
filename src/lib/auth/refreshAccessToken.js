import { ApolloClient, InMemoryCache } from "@apollo/client";
import { refreshDocument } from "../graphql";
import { readAccessToken, setAccessToken } from "../helper";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_LENS_API_ENDPOINT,
  cache: new InMemoryCache(),
});

export default async function refreshAccessToken() {
  // 1. Get our refresh token from the local storage
  const refreshToken = readAccessToken()?.refreshToken;

  if (!refreshToken) return null;

  const fetchToken = async (variables) => {
    if (!process.env.NEXT_PUBLIC_LENS_API_ENDPOINT) {
      return null;
    }

    const res = await client.mutate({
      mutation: refreshDocument,
      variables,
    });

    if (res.errors) {
      const { message } = json.errors[0] || {};
      throw new Error(message || "Error…");
    }

    return res.data;
  };

  // 2. Send the refresh token to Lens to ask for new set of access/refresh token
  const {
    refresh: { accessToken, refreshToken: newRefreshToken },
  } = await fetchToken({
    request: {
      refreshToken,
    },
  });

  // 3. Update the local storage with the new set of access and refresh token
  setAccessToken(accessToken, newRefreshToken);

  return null;
}
