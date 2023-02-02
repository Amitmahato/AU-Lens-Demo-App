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

  return (
    !defaultProfile.id && (
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex flex-col items-center justify-between h-1/5">
          <div className="flex flex-col items-center">
            <div>No Lens Profile Found!</div>
            <div>Let us start by creating a new lens handle for you!</div>
          </div>

          <CreateLensProfile />
        </div>
      </div>
    )
  );
};

export default withPrivateRoute(CreateProfile);
