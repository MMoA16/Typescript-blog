import type { NextPage } from "next";

export type DividerType = {
  className?: string;
};

const Divider: NextPage<DividerType> = ({ className = "" }) => {
  return (
    <div
      className={`container self-stretch flex flex-row items-center justify-start mdN -px-5 ${className}`}
    >
      <div className="flex-1 bg-black h-px" />
    </div>
  );
};

export default Divider;
