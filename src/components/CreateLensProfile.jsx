import { useState, useEffect, useDeferredValue } from "react";
import { Button, Input, Spin } from "antd";
import { createProfile, getProfileByHandle } from "@/lib/auth/profile";
import { message } from "antd";

export const CreateLensProfile = () => {
  const [inputHandle, setInputHanlde] = useState("");
  const [errors, setErrors] = useState([]);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const searchProfileHanle = useDeferredValue(inputHandle);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const errors = [];
    if (inputHandle.length < 5 || inputHandle.length > 31) {
      errors.push(
        "Handle must be minimum of 5 length and maximum of 31 length"
      );
    }

    const regex = /^[a-z0-9_-]+$/;
    if (!regex.test(inputHandle)) {
      errors.push(
        "Handle only supports lower case characters, numbers, - and _"
      );
    }
    setErrors(errors);
    if (success?.length > 0) {
      setSuccess("");
    }
  }, [inputHandle]);

  useEffect(() => {
    if (errors.length === 0 && searchProfileHanle.length > 0) {
      setLoading(true);
      (async () => {
        const foundProfiles = await getProfileByHandle(searchProfileHanle);
        if (foundProfiles.profiles.length > 0) {
          setErrors(["already_taken"]);
        }
        setShowError(true);
        setLoading(false);
      })();
    }
  }, [searchProfileHanle]);

  const onSubmit = async () => {
    setLoading(true);
    const { errors, data } = await createProfile(searchProfileHanle);
    if (errors?.length > 0) {
      setErrors(errors);
      messageApi.error("Failed to create lens profile. Please try again!");
    } else {
      messageApi.success(`Lens Profile created successfully.`);
      setSuccess(data?.createProfile?.txHash);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-start items-start w-full h-1/2">
      {contextHolder}
      <div className="flex flex-row justify-between items-start w-full">
        <Input
          value={inputHandle}
          onChange={(e) => {
            setInputHanlde(e.target.value.toLowerCase());
          }}
          onBlur={() => setShowError(true)}
          type="text"
          placeholder="Enter a handle"
          className="font-sans text-black"
        />
        <Button
          disabled={loading || success?.length || errors.length > 0}
          className="ml-4 text-white disabled:text-white"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
      {!loading && success?.length > 0 && (
        <div className="text-green-500 text-xs flex flex-col justify-center items-start mt-2 w-full">
          <p>
            Successfully created your lens handle: <i>{searchProfileHanle}</i>
          </p>
          <p>
            {"View transaction on Polyscan: "}
            <a
              target="_blank"
              rel="noreferrer"
              href={`${process.env.NEXT_PUBLIC_POLYSCAN_API}/tx/${success}`}
            >
              {success}
            </a>
          </p>
        </div>
      )}
      <ol className="text-red-400 text-xs flex flex-col justify-center items-start mt-2 w-full">
        {loading ? (
          <div className="self-center">
            <Spin />
          </div>
        ) : (
          showError &&
          errors.map((error, index) => (
            <li key={error}>
              {error === "already_taken" ? (
                <span>
                  {index + 1}. Lens handle <i>{searchProfileHanle}</i> already
                  taken! Please try another handle.
                </span>
              ) : (
                `${index + 1}. ${error}`
              )}
            </li>
          ))
        )}
      </ol>
    </div>
  );
};
