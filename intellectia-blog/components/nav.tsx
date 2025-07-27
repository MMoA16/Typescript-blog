"use client";
import {AnimatePresence,motion } from "framer-motion";
import type { NextPage } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
//import ThemeToggle from "./ThemeToggle";
import { Lightbulb, Menu, X } from "lucide-react";
import {
  mobileNavContainerVariant,
  mobileNavListVariant,
  mobileNavExitProps,
} from "../data/animationConfig";
export type NavType = {
  className?: string;
  logoURL?:string;
};
const links = [
  { href: "/AboutUs", text: "About" },
  { href: "/Blogs", text: "Resources" },
  { href: "/Practices", text: "Practices" },
  { href: "/ContactUs", text: "Contact Us" },
];
const Nav: NextPage<NavType> = ({ className = "",logoURL}) => {
  const imageURL=logoURL;
  console.log(imageURL)
  const [isOpen,setIsOpen]=useState(false);
  const toggleNavbar=()=>{
    setIsOpen(!isOpen);
  };
  const activeClassName = "selected navlink";
  const activeStyleCallback = ({ isActive }: { isActive: Boolean }) =>
    isActive ? activeClassName : "navlink";
  return (
    <div
      className={`flex dark:bg-gray-800 flex-wrap items-center justify-between px-20 text-left mdN text-5xl font-dm-sans${className}`}
    >
      <div className="flex flex-col items-start justify-start p-2 box-border">
        <div className="w-119xl text-bold flex-1 relative">
          <img src={imageURL} className="logo-image"></img>
        </div>
      </div>
        <div className="w-1/2 self-stretch flex-row items-start justify-between gap-[20px] text-3xl mhidden md1">
          <div className="flex-1 relative">
          <ul className="flex justify-end py-5 rounded-sm">
          {links.map((p) => (
            <li className="pr-[2.5rem] li-bulletremove " key={p.href}>
              <motion.div whileHover={{ scale:1.05}} variants={mobileNavListVariant} {...mobileNavExitProps}>
                <Link href={p.href} className="li-a">
                  {p.text}
                </Link>
              </motion.div>
            </li>
          ))}
          </ul>
      </div>    
      </div>
      <div className="flex flex-wrap justify-end mhidden">
        <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>

      </div>
      <AnimatePresence mode="wait">
      {isOpen && 
      <motion.div
            layout="position"
            key="nav-links"
            variants={mobileNavContainerVariant}
            initial="hidden"
            animate="show"
            className="mt-6 basis-full mhidden"
          >
      {links.map((p) => (
            <li className="pl-[2.5rem] li-bulletremove" key={p.href}>
          <motion.div variants={mobileNavListVariant} {...mobileNavExitProps}>
          <Link href={p.href} className="li-a" >
            {p.text}
          </Link>
        </motion.div>
      </li>
         ))}
         </motion.div>
}
      </AnimatePresence>
      </div>
    
  );
};

export default Nav;
