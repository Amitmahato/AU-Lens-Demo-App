import { MediaRenderer } from "@thirdweb-dev/react";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  CommentOutlined,
  RetweetOutlined,
  MoneyCollectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { IconWithCount } from "./IconWithCount";
import Link from "next/link";

export const Post = ({ publication }) => {
  return (
    <Card
      cover={
        <MediaRenderer
          style={{
            objectFit: "cover",
            height: 300,
          }}
          alt="Post Image"
          src={publication.metadata.image}
        />
      }
      actions={[
        <IconWithCount count={publication.stats.totalUpvotes} key={0}>
          <CaretUpOutlined />
        </IconWithCount>,
        <IconWithCount count={publication.stats.totalDownvotes} key={1}>
          <CaretDownOutlined />
        </IconWithCount>,
        <IconWithCount count={publication.stats.totalAmountOfComments} key={2}>
          <CommentOutlined />
        </IconWithCount>,
        <IconWithCount count={publication.stats.totalAmountOfMirrors} key={3}>
          <RetweetOutlined />
        </IconWithCount>,
        <IconWithCount count={publication.stats.totalAmountOfCollects} key={4}>
          <MoneyCollectOutlined />
        </IconWithCount>,
      ]}
    >
      <Card.Meta
        className="flex flex-row items-center"
        avatar={
          <Link
            className="flex flex-col justify-center"
            href={`profile/${publication.profile.handle}`}
          >
            {publication.profile.picture ? (
              <Avatar src={publication.profile.picture} />
            ) : (
              <UserOutlined style={{ fontSize: 24 }} />
            )}
            {`@${publication.profile.handle}`}
          </Link>
        }
        title={publication.metadata.name}
        description={publication.metadata.content}
      />
    </Card>
  );
};
