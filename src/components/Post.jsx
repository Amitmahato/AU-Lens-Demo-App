import { MediaRenderer } from "@thirdweb-dev/react";
import {
  CommentOutlined,
  HeartOutlined,
  MoneyCollectOutlined,
  RetweetOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Tooltip } from "antd";
import { IconWithCount } from "./IconWithCount";
import Link from "next/link";

export const Post = ({ publication }) => {
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
        <IconWithCount count={publication.stats.totalUpvotes} key={0}>
          <Tooltip title="Like">
            <HeartOutlined />
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
