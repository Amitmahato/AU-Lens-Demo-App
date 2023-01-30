const { useAppContext } = require("@/lib/appContext");

const Profile = () => {
  const { defaultProfile } = useAppContext();
  return (
    <div>
      <div>Your Profile</div>
      <div>Handle: {defaultProfile.id}</div>
      <div>Name: {defaultProfile.name}</div>
      <div>Total Posts: {defaultProfile.stats.postsTotal}</div>
    </div>
  );
};

export default Profile;
