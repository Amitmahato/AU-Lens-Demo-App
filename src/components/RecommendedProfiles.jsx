import { useAppContext } from "@/lib/appContext";
import { Avatar } from "antd";
import Link from "next/link";
import { Follow } from "./Follow";

export const RecommendedProfiles = ({ recommendedProfiles }) => {
  const { setRecommendedProfiles } = useAppContext();

  const onFollowToggle = (profile) => {
    console.log("Following the user: ", profile.handle);
    // After logged in user follows someone, update their profile's isFollowedByMe
    setRecommendedProfiles((recommendedProfiles) => {
      const followedProfileIndex = recommendedProfiles.findIndex(
        (rcProfile) => profile.id === rcProfile.id
      );
      const followedProfile = recommendedProfiles[followedProfileIndex];
      followedProfile.isFollowedByMe = true;

      return recommendedProfiles.map((profile) =>
        profile.id === followedProfile.id ? followedProfile : profile
      );
    });
  };

  return (
    <div>
      <div>✨ Who To Follow</div>
      <div className="flex flex-col justify-start rounded-md border-gray-200 border-2 h-auto w-80 mt-4">
        {recommendedProfiles.map((profile, index) => {
          return (
            <div
              key={profile.id}
              className={`flex flex-row justify-between items-center mb-4 ${
                index === 0 && "mt-4"
              }`}
            >
              <Link
                href={`profile/${profile.handle}`}
                className="flex flex-row justify-between items-center ml-5"
              >
                <Avatar
                  src={
                    profile.picture ??
                    `https://robohash.org/${profile.handle}.png`
                  }
                  size={40}
                  className="bg-white mr-4"
                />
                <div className="flex flex-col justify-center items-start text-base">
                  <div>{profile.name}</div>
                  <div>@{profile.handle}</div>
                </div>
              </Link>
              <Follow profile={profile} onFollowToggle={onFollowToggle} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
