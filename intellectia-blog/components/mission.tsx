import type { NextPage } from "next";

export type MissionType = {
  className?: string;
  missionLine?: string;
};

const Mission: NextPage<MissionType> = ({ className = "" , missionLine}) => {
  return (
    <div
      className={`flex-1 flex flex-dir1 items-center justify-start resp-gap py-20 px-20 mdN text-left text-lg text-black font-dm-sans ${className}`}
    >
      <div className="flex-1 flex flex-dir1 items-center justify-start p-2.5">
        <div className="w-[100px] relative inline-block h-[23px] shrink-0">
          Our Mission
        </div>
      </div>
      <div className="flex-1 flex flex-row items-center justify-start text-119xl font-dm-serif-display">
        <div className="flex-1 relative">
          {missionLine}
        </div>
      </div>
    </div>
  );
};

export default Mission;
