import type { NextPage } from "next";

export type AboutContainerType = {
  className?: string;
};


const AboutContainer: NextPage<AboutContainerType> = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch h-[1200px] flex flex-row items-center justify-center py-10 px-20 box-border text-left text-lg text-black font-dm-sans ${className}`}
    >
      <div className="flex-1 flex flex-row items-center justify-start gap-[40px]">
        <div className="w-48 flex flex-row items-center justify-start py-2 pr-2 pl-0 box-border">
          <div className="w-[173px] relative inline-block h-[29px] shrink-0">
            About
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-start text-21xl font-dm-serif-display">
          <div className="self-stretch flex flex-col items-center justify-start gap-[40px]">
            <div className="self-stretch flex flex-col items-center justify-start gap-[40px]">
              <div className="w-[1120px] h-80 flex flex-row items-start justify-center gap-[40px]">
                <img
                  className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover"
                  alt=""
                  src="/frame-15@2x.png"
                />
                <img
                  className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover"
                  alt=""
                  src="/frame-20@2x.png"
                />
              </div>
              <img
                className="self-stretch relative max-w-full overflow-hidden h-80 shrink-0 object-cover"
                alt=""
                src="/frame-14@2x.png"
              />
            </div>
            <div className="w-[1120px] flex flex-col items-start justify-center gap-[24px]">
              <div className="self-stretch relative">Heading</div>
              <div className="self-stretch relative text-lg leading-[32px] font-dm-sans">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContainer;
