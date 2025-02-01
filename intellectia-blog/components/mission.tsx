import type { NextPage } from "next";

export type MissionType = {
  className?: string;
  missionLine?: string;
};

const Mission: NextPage<MissionType> = ({ className = "" , missionLine}) => {
  return (
    <div
      className={`flex-1 flex flex-col items-center justify-start resp-gap py-20 px-20 mdN text-left text-lg text-black font-dm-sans ${className}`}
    >
      <h1 className="text-gray">
        Enticing statement
      </h1>
      
      <div className="flex-1 flex flex-row items-center justify-start text-base font-normal">
        <div className="flex-1 relative">
        Intelectia can help you get the right type of protection for your
creation or invention. Protecting your IP is an important
investment for your business. Your IP is exclusive to you which
benefits you not only in terms of business exclusiveness but
also ultimately leads to getting recognition and great economic
benefit. Protecting your IP is nothing but securing your business.
<br></br>
How you protect your intellectual property depends on what types
of intellectual property you have.  Please leave a mail with your
requirement.<br></br>
Our services also include transfer of property, scrutiny, litigation -
Civil, Criminal, Matrimonial, Appeals etc, POSH services &amp; all
allied property matters.
        </div>
      </div>
    </div>
  );
};

export default Mission;
