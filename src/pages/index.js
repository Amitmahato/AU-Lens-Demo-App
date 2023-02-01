"use client";

import { FullScreenLoader } from "@/components/FullScreenLoader";
import { ListOfPosts } from "@/components/PostList";
import SignInButton from "@/components/SignInButton";
import { useAppContext } from "@/lib/appContext";
import { getEveryonePublications } from "@/lib/publications/posts";
import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();
  const { isLoading, defaultProfile, signedIn } = useAppContext();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!defaultProfile.id || !signedIn) {
    return <SignInButton />;
  }

  // if default user doesn't have any post yet, take the user to create posts page
  if (signedIn && defaultProfile.stats.postsTotal === 0) {
    push("/posts/create");
  }

  return (
    <div
      className="flex flex-col items-center px-20 py-8 h-screen w-full overflow-y-scroll"
      id="scrollableDiv"
    >
      <p className="text-5xl pb-10">Lensgram</p>
      <ListOfPosts
        enabled={true}
        dataSource={async (cursor) => await getEveryonePublications(cursor)}
      />
    </div>
  );
}
