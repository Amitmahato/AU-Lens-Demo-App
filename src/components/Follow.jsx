import { useAppContext } from "@/lib/appContext";
import { useFollow } from "@/lib/publications/useFollow";
import { Button, Spin } from "antd";
import { memo, useState } from "react";

const FollowButton = ({ profile, onFollowToggle }) => {
  const { defaultProfile } = useAppContext();
  const [loading, setLoading] = useState(false);
  const { follow } = useFollow();

  let followButtonContent;
  if (profile.isFollowedByMe) {
    followButtonContent = "Following";
  } else if (profile.isFollowing) {
    followButtonContent = "Follow Back";
  } else if (profile.handle !== defaultProfile.handle) {
    followButtonContent = "Follow";
  }

  return (
    followButtonContent && (
      <div className="items-center justify-center">
        <Button
          className="text-white w-24 mr-5"
          onClick={async () => {
            setLoading(true);
            await follow({ profileId: profile.id });
            onFollowToggle(profile);
            setLoading(false);
          }}
        >
          {loading ? <Spin /> : followButtonContent}
        </Button>
      </div>
    )
  );
};

const Follow = memo(FollowButton);
export { Follow };
