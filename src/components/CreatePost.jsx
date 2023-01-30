import { useEffect, useState } from "react";
import { Button, Input, message, Spin, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCreatePost } from "@/lib/publications/useCreatePost";
import { useRouter } from "next/router";

export const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

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
    <>
      {contextHolder}
      <div className="flex flex-col justify-between items-end w-96 h-80">
        <div className="flex flex-col justify-start items-end w-96 h-64">
          {/* Title */}
          <Input
            value={title}
            className="h-8 mb-2"
            placeholder="Enter post title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          {/* Description */}
          <Input
            className="h-8 mb-2"
            value={description}
            placeholder="Enter post description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          {/* Content */}
          <Input.TextArea
            className="h-full mb-2"
            autoSize={{ minRows: 3, maxRows: 3 }}
            value={content}
            placeholder="Enter post content"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />

          <div className="self-center">
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
          className={`text-white disabled:text-white w-full h-10 ${
            loading ? "pt-2 pb-0" : "p-1"
          }`}
          onClick={handlePostSubmit}
          disabled={disabled}
        >
          {loading ? <Spin /> : "Submit"}
        </Button>
      </div>
    </>
  );
};
