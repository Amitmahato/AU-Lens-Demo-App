"use client";
import SignInButton from "@/components/SignInButton";
import { useAppContext } from "@/lib/appContext";
import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();
  const { defaultProfile, signedIn } = useAppContext();

  if (!defaultProfile.id || !signedIn) {
    return <SignInButton />;
  }

  // if default user doesn't have any post yet, take the user to create posts page
  if (signedIn && defaultProfile.stats.postsTotal === 0) {
    push("/posts/create");
  }

  // TODO - Display a list of posts from other users
  return <div>List of posts</div>;
}
