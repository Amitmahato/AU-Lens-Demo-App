import "../styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { AppContext, DEFAULT_PROFILE } from "@/lib/appContext";
import { useState } from "react";

const activeChainId = ChainId.Mumbai;

export default function App({ Component, pageProps }) {
  const [defaultProfile, setDefaultProfile] = useState(DEFAULT_PROFILE);
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <AppContext.Provider
        value={{
          isLoading: false,
          defaultProfile,
          setDefaultProfile,
        }}
      >
        <div className="flex justify-center items-center h-screen bg-gray-800 text-white text-xl">
          <Component {...pageProps} />
        </div>
      </AppContext.Provider>
    </ThirdwebProvider>
  );
}
