import type { NextPage } from "next";

export type DividerType = {
  className?: string;
};

const Divider: NextPage<DividerType> = ({ className = "" }) => {
  return (
    <div className={`w-full relative left-1/2 right-1/2 -mx-[50vw] ${className}`}>
      <div className="w-full max-w-[90%] mx-auto">
        <div className="h-px bg-black" />
      </div>
    </div>
  );
};

export default Divider;
