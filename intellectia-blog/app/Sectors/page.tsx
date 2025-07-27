import { NextPage } from "next";

export type SectorContainerType={
    className?:string;
};

const Sectors: NextPage<SectorContainerType>= async()=>{
    return(
        <h1>Hi</h1>
    )
}

export default Sectors;