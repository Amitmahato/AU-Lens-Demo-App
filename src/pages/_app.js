import "../styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { AppContext } from "@/lib/appContext";
import { useState } from "react";

const activeChainId = ChainId.Mumbai;

export default function App({ Component, pageProps }) {
  const [defaultProfile, setDefaultProfile] = useState({
    bio: null,
    handle: null,
    id: null,
    name: null,
    ownedBy: null,
  });
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <AppContext.Provider
        value={{
          isLoading: false,
          defaultProfile,
          setDefaultProfile,
        }}
      >
        <Component {...pageProps} />
      </AppContext.Provider>
    </ThirdwebProvider>
  );
}
