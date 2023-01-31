export const IconWithCount = ({ children, count, onClick }) => {
  return (
    <div className="flex flex-col justify-center" onClick={onClick}>
      {children} {count}
    </div>
  );
};
