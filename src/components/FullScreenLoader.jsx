const { Spin } = require("antd");

export const FullScreenLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-800 text-white text-xl">
      <Spin />
    </div>
  );
};
