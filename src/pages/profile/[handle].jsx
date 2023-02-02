"use client";

import { ListOfPosts } from "@/components/PostList";
import { useAppContext } from "@/lib/appContext";
import { getSingleUserProfileByHandle } from "@/lib/auth/profile";
import { getPublicationByProfileId } from "@/lib/publications/posts";
import { Button, Divider, Tabs } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Follow } from "@/components/Follow";

const Profile = () => {
  const router = useRouter();
  const handle = router.query.handle;
  const { defaultProfile } = useAppContext();
  const [profile, setProfile] = useState({});

  console.log("DEFAULT PROFILE: ", defaultProfile.id);

  useEffect(() => {
    if (handle) {
      (async () => {
        const { profile: pf } = await getSingleUserProfileByHandle(handle);
        setProfile(pf);
      })();
    }
  }, [handle]);

  return (
    <div className="w-full h-screen overflow-y-scroll" id="scrollableDiv">
      <div
        className="h-1/3"
        style={{
          backgroundColor: "#8b5cf6d9",
        }}
      />
      <Link className="absolute  top-5 left-5" href="/">
        <Button className="rounded-full bg-white text-3xl h-16 w-16 text-black">
          ←
        </Button>
      </Link>
      <div className="mx-20 flex flex-row text-sm sm:text-base">
        <div className="w-1/2">
          <div className="h-40 w-40 bg-white rounded-lg overflow-hidden -mt-20 mb-10">
            <Image
              src={`https://robohash.org/${handle}.png`}
              alt="avatar"
              style={{
                objectFit: "cover",
              }}
              width={500}
              height={500}
            />
          </div>
          <div className="flex flex-row items-en">
            <div className="w-1/2">
              <div className="text-2xl">{profile.name}</div>
              <div>@{profile.handle}</div>
            </div>
            <div className="ml-7 w-1/2">
              <Follow
                profile={profile}
                onFollowToggle={() => {
                  setProfile((profile) => {
                    profile.isFollowedByMe = true;
                    return profile;
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-col font-sans space-y-5 mt-10">
            {/* Following & Followers */}
            <div className="flex flex-row font-sans space-x-10">
              <div className="flex flex-col w-1/2">
                <div>{profile.stats?.totalFollowing ?? 0}</div>
                <div className="text-gray-300">Following</div>
              </div>
              <div className="flex flex-col w-1/2">
                <div>{profile.stats?.totalFollowers ?? 0}</div>
                <div className="text-gray-300">Followers</div>
              </div>
            </div>
            {/* Posts & Mirrors */}
            <div className="flex flex-row font-sans space-x-10">
              <div className="flex flex-col w-1/2">
                <div>{profile.stats?.postsTotal ?? 0}</div>
                <div className="text-gray-300">Posts</div>
              </div>
              <div className="flex flex-col w-1/2">
                <div>{profile.stats?.mirrorsTotal ?? 0}</div>
                <div className="text-gray-300">Mirrors</div>
              </div>
            </div>
            {/* Comments & Collects */}
            <div className="flex flex-row font-sans space-x-10">
              <div className="flex flex-col w-1/2">
                <div>{profile.stats?.commentsTotal ?? 0}</div>
                <div className="text-gray-300">Comments</div>
              </div>
              <div className="flex flex-col w-1/2">
                <div>{profile.stats?.totalCollects ?? 0}</div>
                <div className="text-gray-300">Collects</div>
              </div>
            </div>
            {/* Publications */}
            <div className="flex flex-col w-1/2">
              <div>{profile.stats?.publicationsTotal ?? 0}</div>
              <div className="text-gray-300">Publications</div>
            </div>
          </div>
          <Divider className="bg-white" />
          <div>#{profile.id}</div>
        </div>

        <div className="border-l-white border-10 w-full px-36">
          <Tabs
            defaultActiveKey="feed"
            items={["feed"].map(() => ({
              label: (
                <div className="mt-5 flex flex-row items-center text-white">
                  <EditOutlined /> Feed
                </div>
              ),
              key: "feed",
            }))}
          />
          <ListOfPosts
            enabled={!!profile.id && !!defaultProfile.id}
            dataSource={async (cursor) =>
              await getPublicationByProfileId(
                cursor,
                profile.id,
                defaultProfile.id
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
