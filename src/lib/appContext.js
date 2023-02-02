import { CreateLensProfile } from "@/components/CreateLensProfile";
import { CreatePost } from "@/components/CreatePost";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import SignInButton from "@/components/SignInButton";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect } from "react";
import { getLensUser } from "./auth/getLensUser";

export const DEFAULT_PROFILE = {
  bio: null,
  handle: null,
  id: null,
  name: null,
  ownedBy: null,
  stats: {
    postsTotal: 0,
  },
};

export const AppContext = createContext({
  isLoading: false,
  address: null,
  setAddress: () => {},
  signedIn: false,
  setSignedIn: () => {},
  defaultProfile: DEFAULT_PROFILE,
  setDefaultProfile: () => {},
  recommendedProfiles: [],
  setRecommendedProfiles: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AuthProvider = ({ value, children }) => {
  const {
    isLoading,
    setLoading,
    address,
    setAddress,
    defaultProfile,
    setDefaultProfile,
    signedIn,
    setSignedIn,
    recommendedProfiles,
    setRecommendedProfiles,
  } = value;

  const router = useRouter();
  const _address = useAddress();

  useEffect(() => {
    console.info("Address: ", _address);
    setLoading(true);
    if (_address && !signedIn) {
      (async () => {
        const { isSignedInQuery, profileQuery } = await getLensUser(_address);
        setAddress(_address);

        if (isSignedInQuery?.accessToken) {
          setSignedIn(true);
        }

        setDefaultProfile(profileQuery.defaultProfile);
        setLoading(false);
      })();
    }
    setLoading(false);
  }, [
    _address,
    signedIn,
    setDefaultProfile,
    setAddress,
    setLoading,
    setSignedIn,
    router,
  ]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800 text-white text-xl">
      <AppContext.Provider
        value={{
          isLoading,
          address,
          setAddress,
          defaultProfile,
          setDefaultProfile,
          signedIn,
          setSignedIn,
          recommendedProfiles,
          setRecommendedProfiles,
        }}
      >
        {children}
      </AppContext.Provider>
    </div>
  );
};

export const withPrivateRoute = (AuthComponent) => {
  function PrivateComponent({ children }) {
    const { defaultProfile, signedIn, address } = useContext(AppContext);

    if (!address || !signedIn) {
      return <SignInButton />;
    } else {
      if (!defaultProfile.id) {
        return <CreateLensProfile />;
      } else if (defaultProfile.stats.postsTotal === 0) {
        return <CreatePost />;
      } else {
        return children;
      }
    }
  }

  return class Higher extends React.Component {
    render() {
      return (
        <PrivateComponent>
          <AuthComponent {...this.props} />
        </PrivateComponent>
      );
    }
  };
};
