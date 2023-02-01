"use client";

import { FullScreenLoader } from "@/components/FullScreenLoader";
import { ListOfPosts } from "@/components/PostList";
import { RecommendedProfiles } from "@/components/RecommendedProfiles";
import { SideNav } from "@/components/SideNav";
import { useAppContext, withPrivateRoute } from "@/lib/appContext";
import { getEveryonePublications } from "@/lib/publications/posts";
import { useRouter } from "next/router";

function Home() {
  const { push } = useRouter();
  const {
    isLoading,
    defaultProfile,
    signedIn,
    recommendedProfiles,
    setRecommendedProfiles,
  } = useAppContext();

  const getPublications = async (cursor) => {
    const response = await getEveryonePublications(cursor);
    if (response.data) {
      // Set unique new profiles as recommended profiles as more and more contents are loaded
      const profileIds = recommendedProfiles.map((profile) => profile.id);
      setRecommendedProfiles([
        ...recommendedProfiles,
        ...response.data.publications.items
          .filter(({ profile }) => {
            if (profileIds.includes(profile.id)) {
              return false;
            } else {
              profileIds.push(profile.id);
              return true;
            }
          })
          .map((publication) => publication.profile),
      ]);
    }

    return response;
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  // if default user doesn't have any post yet, take the user to create posts page
  if (signedIn && defaultProfile.stats.postsTotal === 0) {
    push("/posts/create");
  }

  console.log(defaultProfile.handle);

  return (
    defaultProfile.stats.postsTotal !== 0 && (
      <>
        <div
          className="flex flex-col items-center px-20 py-8 h-screen w-full overflow-y-scroll"
          id="scrollableDiv"
        >
          <p className="text-5xl pb-10">Lensgram</p>
          <div className="flex flex-row w-full justify-between space-x-10">
            <div className="mt-40">
              <SideNav defaultProfile={defaultProfile} />
            </div>
            <div className="flex-grow">
              <ListOfPosts enabled={true} dataSource={getPublications} />
            </div>
            <RecommendedProfiles recommendedProfiles={recommendedProfiles} />
          </div>
        </div>
      </>
    )
  );
}

export default withPrivateRoute(Home);
