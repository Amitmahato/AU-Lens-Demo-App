import "../styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { AuthProvider, DEFAULT_PROFILE } from "@/lib/appContext";
import { useState } from "react";
import { message } from "antd";

const activeChainId = ChainId.Mumbai;

export default function App({ Component, pageProps }) {
  const [isLoading, setLoading] = useState(true);
  const [address, setAddress] = useState(null);
  const [signedIn, setSignedIn] = useState(false);
  const [defaultProfile, setDefaultProfile] = useState(DEFAULT_PROFILE);
  const [_, contextHolder] = message.useMessage();

  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <AuthProvider
        value={{
          isLoading,
          setLoading,
          address,
          setAddress,
          defaultProfile,
          setDefaultProfile,
          signedIn,
          setSignedIn,
        }}
      >
        {contextHolder}
        <Component {...pageProps} />
      </AuthProvider>
    </ThirdwebProvider>
  );
}
