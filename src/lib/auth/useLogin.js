import { useState } from "react";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { setAccessToken } from "../helper";
import { generateChallenge, sendSignedMessage } from "./authenticate";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const address = useAddress();
  const sdk = useSDK();

  // 1. Write the actual async function
  async function login() {
    setIsLoading(true);
    // 0. Make sure the user has connected their wallet
    if (!address) {
      return;
    }

    // 1. Generate a challenge which comes from Lens API
    const { challenge } = await generateChallenge(address);

    // 2. Sign the challenge with the user's wallet
    const signature = await sdk?.wallet.sign(challenge.text);

    // 3. Send the signed challenge to the Lens API & 4. Receive Access Token from Lens API if succeed
    const {
      authenticate: { accessToken, refreshToken },
    } = await sendSignedMessage({
      address,
      signature,
    });

    // 5. Store the Access Token in Local Storage so we can use it later on
    setAccessToken(accessToken, refreshToken);
    setLoggedIn(true);
    setIsLoading(false);
  }

  // 2. Return the useMutation hook wrapping the async function
  return { requestLogin: login, isLoading, loggedIn };
};
