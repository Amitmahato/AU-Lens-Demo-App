import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import refreshAccessToken from "./auth/refreshAccessToken";
import { isTokenExpired, readAccessToken } from "./helper";

const authLink = setContext(async (_, { headers }) => {
  const getAccessToken = async () => {
    // 1. Check the local storage for access token
    let token = readAccessToken();

    // 2. If there is no access token, then return null (not signed in)
    if (!token?.accessToken) return null;

    // 3. If there is an access token, check if it is expired or not
    const isExpired = isTokenExpired(token?.exp);

    // 4. If the access token is expired, update it using the refresh token
    if (isExpired) {
      const newAccessToken = await refreshAccessToken();

      if (!newAccessToken) return null;
      token.accessToken = newAccessToken;
    }

    // 5. Finally return the access token
    return token.accessToken;
  };

  const accessToken =
    typeof window !== "undefined" ? await getAccessToken() : null;

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_LENS_API_ENDPOINT,
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
