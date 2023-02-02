"use client";
import {
  ConnectWallet,
  useAddress,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";
import { useLogin } from "../lib/auth/useLogin";
import { useAppContext } from "@/lib/appContext";
import { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import { useRouter } from "next/router";

export default function SignInButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { defaultProfile, address, signedIn, setAddress } = useAppContext();
  const _address = useAddress(); // Detect connected network

  const isOnWrongNetwork = useNetworkMismatch(); // Detect if the user is on wrong network
  const [, switchNetwork] = useNetwork(); // Switch to the configured network

  const { requestLogin } = useLogin();

  useEffect(() => {
    if (!address || _address !== address) {
      setAddress(_address);
    }
  }, [_address, address, setAddress]);

  useEffect(() => {
    setIsLoading(false);
  }, [address]);

  // Loading user's signed in data
  if (isLoading) {
    return <Spin />;
  }

  // 1. User needs to connect to their wallet
  if (!address && !isLoading) {
    return <ConnectWallet accentColor="#7AADE7" colorMode="dark" />;
  }

  // 2. User needs to switch their network to polygon
  if (isOnWrongNetwork) {
    return (
      <Button
        onClick={() => {
          switchNetwork?.(ChainId.Mumbai);
        }}
      >
        Switch to Polygon Mumbai
      </Button>
    );
  }

  // 3. Sign In with Lens
  // If the user is not signed in, we need the user to sign in
  if (!isLoading && !signedIn) {
    return (
      <Button
        onClick={async () => {
          await requestLogin();
        }}
        className="text-white px-4 py-1 "
      >
        Sign In with Lens
      </Button>
    );
  }

  // 4. Show user their profile on Lens
  // If there is no profile data, it means the user doesn't have a lens handle
  if (!defaultProfile?.id) {
    // If the user doesn't have a lens profile, navigate to create lens profile page
    router.push("/profile/create");
    return <Spin />;
  }

  // Otherwise, render the profile information
  return <div>Hello, {defaultProfile.handle}</div>;
}
