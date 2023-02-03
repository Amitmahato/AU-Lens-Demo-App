import { CreateLensProfile } from "@/components/CreateLensProfile";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { useAppContext, withPrivateRoute } from "@/lib/appContext";
import { useRouter } from "next/router";

const CreateProfile = () => {
  const router = useRouter();
  const { isLoading, defaultProfile } = useAppContext();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  /**
   * If the user has lens handle, and user is inside create lens profile page
   * Navigate the user back to home page
   */
  if (defaultProfile.id) {
    router.push("/");
  }

  return !defaultProfile.id && <CreateLensProfile />;
};

export default withPrivateRoute(CreateProfile);
