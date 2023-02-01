"use client";

import { CreatePost } from "@/components/CreatePost";
import { withPrivateRoute } from "@/lib/appContext";

const CreatePostPage = () => {
  return <CreatePost />;
};

export default withPrivateRoute(CreatePostPage);
