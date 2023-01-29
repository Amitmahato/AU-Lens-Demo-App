"use client";

import { useEffect } from "react";
import { useAppContext } from "@/lib/appContext";
import { useRouter } from "next/router";
import { CreatePost } from "@/components/CreatePost";

export default function CreatePostPage() {
  const router = useRouter();
  const { defaultProfile, address, signedIn } = useAppContext();

  useEffect(() => {
    if (!defaultProfile.id || !signedIn) {
      router.push("/");
      return;
    }
  }, [address, signedIn]);

  return (
    <div>
      <CreatePost />
    </div>
  );
}
