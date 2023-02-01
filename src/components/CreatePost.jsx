import { useEffect, useState } from "react";
import { Button, Input, message, Spin, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCreatePost } from "@/lib/publications/useCreatePost";
import { useRouter } from "next/router";
import { useAppContext } from "@/lib/appContext";
import Link from "next/link";

export const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const { defaultProfile } = useAppContext();

  const { createPost } = useCreatePost();

  const handlePostSubmit = async () => {
    setLoading(true);
    const { data } = await createPost({
      image: file,
      title,
      description,
      content,
    });

    if (data) {
      messageApi.success("Post has been created successfully");
      router.push(`/profile/${data.handle}`);
    } else {
      messageApi.error("Failed to create the post");
    }

    setLoading(false);
  };

  useEffect(() => {
    setDisabled(
      loading ||
        !(
          title.length > 0 &&
          description.length > 0 &&
          content.length > 0 &&
          file
        )
    );
  }, [title, description, content, file, loading]);

  return (
    <div className="flex flex-col h-full py-8 items-center">
      {contextHolder}

      <Link className="absolute top-5 left-5" href="/">
        <Button className="rounded-full bg-white text-3xl h-16 w-16 text-black">
          ←
        </Button>
      </Link>
      <Link href="/" className="mb-32 h-20">
        <p className="text-5xl">Lensgram</p>
      </Link>
      <div className="flex flex-col justify-between items-start w-96 h-full mb-28">
        <div className="text-3xl pb-5 text-center">
          {defaultProfile.stats.postsTotal === 0 ? (
            <p>
              Let us proceed by creating your{" "}
              <strong>
                <i>#1st</i>
              </strong>{" "}
              post
            </p>
          ) : (
            <p>
              Create your{" "}
              <strong>
                <i>#{defaultProfile.stats.postsTotal + 1}th</i>
              </strong>{" "}
              post
            </p>
          )}
        </div>
        <div className="flex flex-col justify-start items-end w-96 h-full">
          {/* Title */}
          <Input
            value={title}
            className="h-12 mb-2"
            placeholder="Enter post title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          {/* Description */}
          <Input
            className="h-12 mb-2"
            value={description}
            placeholder="Enter post description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          {/* Content */}
          <Input.TextArea
            className="h-full mb-2"
            autoSize={{ minRows: 5, maxRows: 5 }}
            value={content}
            placeholder="Enter post content"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />

          <div className="self-center mt-1">
            <Upload
              className="mr-0"
              name="file"
              listType="picture-card"
              onRemove={(_file) => {
                setFile(null);
              }}
              beforeUpload={(_file) => {
                setFile(_file);
                return false;
              }}
              maxCount={1}
            >
              <div className="flex flex-col justify-center text-white">
                <UploadOutlined />
                Upload
              </div>
            </Upload>
          </div>
        </div>
        <Button
          className={`text-white disabled:text-white w-full h-12 ${
            loading ? "pt-2 pb-0" : "p-1"
          }`}
          onClick={handlePostSubmit}
          disabled={disabled}
        >
          {loading ? <Spin /> : "Submit"}
        </Button>
      </div>
    </div>
  );
};
