"use client";
import {
  ConnectWallet,
  useAddress,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";
import { getLensUser } from "@/lib/auth/getLensUser";
import { useLogin } from "../lib/auth/useLogin";
import { DEFAULT_PROFILE, useAppContext } from "@/lib/appContext";
import { useEffect, useState } from "react";

export default function SignInButton() {
  const [isLoading, setIsLoading] = useState(true);
  const { defaultProfile, setDefaultProfile } = useAppContext();
  const [isSignedInQuery, setIsSignedInQuery] = useState({
    accessToken: null,
    refreshToken: null,
    exp: null,
  });
  const address = useAddress(); // Detect connected network

  const isOnWrongNetwork = useNetworkMismatch(); // Detect if the user is on wrong network
  const [, switchNetwork] = useNetwork(); // Switch to the configured network

  const { requestLogin, isLoading: isLogginIn } = useLogin();

  useEffect(() => {
    setIsLoading(true);
    if (address) {
      (async () => {
        const { isSignedInQuery, profileQuery } = await getLensUser(address);
        setDefaultProfile(profileQuery.defaultProfile);
        setIsSignedInQuery(isSignedInQuery);
        setIsLoading(false);
      })();
    } else {
      setDefaultProfile(DEFAULT_PROFILE);
    }
  }, [address, isLogginIn]);

  useEffect(() => {
    setIsLoading(false);
  }, [address]);

  // Loading user's signed in data
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 1. User needs to connect to their wallet
  if (!address && !isLoading) {
    return <ConnectWallet accentColor="#7AADE7" colorMode="dark" />;
  }

  // 2. User needs to switch their network to polygon
  if (isOnWrongNetwork) {
    return (
      <button
        onClick={() => {
          switchNetwork?.(ChainId.Mumbai);
        }}
      >
        Switch to Polygon Mumbai
      </button>
    );
  }

  // 3. Sign In with Lens
  // If the user is not signed in, we need the user to sign in
  if (!isSignedInQuery?.accessToken) {
    return (
      <button
        onClick={() => {
          requestLogin();
        }}
      >
        Sign In with Lens
      </button>
    );
  }

  // 4. Show user their profile on Lens
  // If there is no profile data, it means the user doesn't have a lens handle
  if (!defaultProfile?.id) {
    // TODO: Render a UI to allow profile creation on polygon mumbai testnet
    return <div>No Lens Profile Found</div>;
  }

  // Otherwise, render the profile information
  return <div>Hello, {defaultProfile.handle}</div>;
}
