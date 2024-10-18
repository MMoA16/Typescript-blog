import type { NextPage } from "next";

export type DividerType = {
  className?: string;
};

const Divider: NextPage<DividerType> = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-row items-center justify-start py-0 px-20 ${className}`}
    >
      <div className="flex-1 bg-black h-px" />
    </div>
  );
};

export default Divider;
