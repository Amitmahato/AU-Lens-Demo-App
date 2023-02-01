import { Avatar } from "antd";
import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

export const SideNav = ({ defaultProfile }) => {
  const router = useRouter();
  return (
    <div className="w-80 flex flex-col space-y-12 static pl-10">
      <Link
        href="/"
        className="flex flex-row justify-start items-center"
        onClick={() => {}}
      >
        <HomeOutlined className="mr-4 p-2" style={{ fontSize: 24 }} />
        Home
      </Link>
      <Link
        href="/posts/create"
        className="flex flex-row justify-start items-center"
      >
        <PlusCircleOutlined
          className="mr-4 rounded-lg p-2"
          style={{ fontSize: 24 }}
        />
        Create
      </Link>
      <Link
        href={`/profile/${defaultProfile.handle}`}
        className="flex flex-row justify-start items-center"
      >
        <Avatar
          src={`https://robohash.org/${defaultProfile.handle}.png`}
          size={28}
          className="ml-2 mr-5 bg-white"
        />
        Profile
      </Link>
    </div>
  );
};
