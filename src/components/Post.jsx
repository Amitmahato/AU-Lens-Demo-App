import { MediaRenderer } from "@thirdweb-dev/react";
import {
  CommentOutlined,
  HeartOutlined,
  HeartFilled,
  MoneyCollectOutlined,
  RetweetOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Tooltip } from "antd";
import { IconWithCount } from "./IconWithCount";
import Link from "next/link";
import { reactToPost } from "@/lib/publications/posts";
import { useState } from "react";
import { useAppContext } from "@/lib/appContext";

export const Post = ({ publication, onReact = () => {} }) => {
  const { defaultProfile } = useAppContext();
  const [addingReaction, setAddingReaction] = useState(false);

  const onClickLike = async () => {
    const reactionType =
      publication.reaction === "UPVOTE" ? "DOWNVOTE" : "UPVOTE";
    setAddingReaction(true);
    await reactToPost({
      profileId: defaultProfile.id,
      publicationId: publication.id,
      reactionType,
    });
    onReact(publication.id, reactionType);
    setAddingReaction(false);
  };

  return (
    <Card
      cover={
        <div className="relative">
          <MediaRenderer
            style={{
              objectFit: "cover",
              height: 300,
            }}
            className="w-full"
            alt="Post Image"
            src={publication.metadata.image}
          />
          <div className="absolute top-1 right-2 cursor-pointer">
            {publication.id}
          </div>
        </div>
      }
      actions={[
        <IconWithCount
          count={publication.stats.totalUpvotes}
          key={0}
          onClick={onClickLike}
          loading={addingReaction}
        >
          <Tooltip
            title={publication.reaction !== "UPVOTE" ? "Like" : "Dislike"}
          >
            {publication.reaction !== "UPVOTE" ? (
              <HeartOutlined />
            ) : (
              <HeartFilled style={{ color: "rgb(59,130,246)" }} />
            )}
          </Tooltip>
        </IconWithCount>,
        <IconWithCount count={publication.stats.totalAmountOfComments} key={2}>
          <Tooltip title="Comment">
            <CommentOutlined />
          </Tooltip>
        </IconWithCount>,
        <IconWithCount count={publication.stats.totalAmountOfMirrors} key={3}>
          <Tooltip title="Mirror">
            <RetweetOutlined />
          </Tooltip>
        </IconWithCount>,
        <IconWithCount count={publication.stats.totalAmountOfCollects} key={4}>
          <Tooltip title="Collect">
            <MoneyCollectOutlined />
          </Tooltip>
        </IconWithCount>,
      ]}
    >
      <Card.Meta
        className="flex flex-row items-center"
        avatar={
          <Link
            className="flex flex-col justify-center items-center"
            href={`profile/${publication.profile.handle}`}
          >
            {publication.profile.picture || publication.profile.handle ? (
              <Avatar
                src={
                  publication.profile.picture ??
                  `https://robohash.org/${publication.profile.handle}.png`
                }
                size={50}
              />
            ) : (
              <UserOutlined style={{ fontSize: 24 }} />
            )}
            <div>
              {publication.profile.name ?? `@${publication.profile.handle}`}
            </div>
          </Link>
        }
        title={publication.metadata.name}
        description={publication.metadata.content}
      />
    </Card>
  );
};
