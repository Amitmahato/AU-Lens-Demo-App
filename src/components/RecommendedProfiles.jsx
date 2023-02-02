import { useAppContext } from "@/lib/appContext";
import { Avatar, Button } from "antd";
import Link from "next/link";

export const RecommendedProfiles = ({ recommendedProfiles }) => {
  const { defaultProfile } = useAppContext();
  return (
    <div>
      <div>✨ Who To Follow</div>
      <div className="flex flex-col justify-start rounded-md border-gray-200 border-2 h-auto w-80 mt-4">
        {recommendedProfiles.map((profile, index) => {
          let followButtonContent;
          if (profile.isFollowedByMe) {
            followButtonContent = "Following";
          } else if (profile.isFollowing) {
            followButtonContent = "Follow Back";
          } else if (profile.handle !== defaultProfile.handle) {
            console.log(profile.handle, defaultProfile.handle);
            followButtonContent = "Follow";
          }
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
              {followButtonContent && (
                <div className="items-center justify-center">
                  <Button className="text-white mr-5">Follow</Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
