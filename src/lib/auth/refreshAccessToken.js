import { refreshDocument } from "../graphql";
import { readAccessToken, setAccessToken } from "../helper";

export default async function refreshAccessToken() {
  // 1. Get our refresh token from the local storage
  const refreshToken = readAccessToken()?.refreshToken;

  if (!refreshToken) return null;

  const fetchToken = async (query, variables, options = {}) => {
    if (!process.env.NEXT_PUBLIC_LENS_API_ENDPOINT) {
      return null;
    }

    const res = await fetch(process.env.NEXT_PUBLIC_LENS_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0] || {};
      throw new Error(message || "Error…");
    }

    return json.data;
  };

  // 2. Send the refresh token to Lens to ask for new set of access/refresh token
  const {
    refresh: { accessToken, refreshToken: newRefreshToken },
  } = await fetchToken(refreshDocument, {
    request: {
      refreshToken,
    },
  });

  // 3. Update the local storage with the new set of access and refresh token
  setAccessToken(accessToken, newRefreshToken);

  return accessToken;
}
