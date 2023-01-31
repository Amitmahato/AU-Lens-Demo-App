import "../styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { AppContext, DEFAULT_PROFILE } from "@/lib/appContext";
import { useState } from "react";
import { message } from "antd";

const activeChainId = ChainId.Mumbai;

export default function App({ Component, pageProps }) {
  const [address, setAddress] = useState(null);
  const [signedIn, setSignedIn] = useState(false);
  const [defaultProfile, setDefaultProfile] = useState(DEFAULT_PROFILE);
  const [_, contextHolder] = message.useMessage();

  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <AppContext.Provider
        value={{
          isLoading: false,
          address,
          setAddress,
          defaultProfile,
          setDefaultProfile,
          signedIn,
          setSignedIn,
        }}
      >
        <div className="flex justify-center items-center h-screen bg-gray-800 text-white text-xl">
          {contextHolder}
          <Component {...pageProps} />
        </div>
      </AppContext.Provider>
    </ThirdwebProvider>
  );
}
