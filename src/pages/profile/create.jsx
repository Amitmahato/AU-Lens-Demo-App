import { CreateLensProfile } from "@/components/CreateLensProfile";

const CreateProfile = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex flex-col items-center justify-between h-1/5">
        <div className="flex flex-col items-center">
          <div>No Lens Profile Found!</div>
          <div>Let us start by creating a new lens handle for you!</div>
        </div>

        <CreateLensProfile />
      </div>
    </div>
  );
};

export default CreateProfile;
