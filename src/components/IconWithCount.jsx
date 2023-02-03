import { Spin } from "antd";

export const IconWithCount = ({
  children,
  count,
  loading = false,
  onClick,
}) => {
  return (
    <div className="flex flex-col justify-center" onClick={onClick}>
      <div>{loading ? <Spin size="small" /> : children}</div> <div>{count}</div>
    </div>
  );
};
