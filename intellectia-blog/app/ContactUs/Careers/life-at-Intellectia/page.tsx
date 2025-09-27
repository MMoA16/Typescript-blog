"use client";

import React, { useState, useEffect } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/Footer/Footer";
import { ArrowDown } from "lucide-react";


async function getStrapiData(url: string) {
  const baseURL = "http://localhost:1337";
  try {
    const response = await fetch(baseURL + url, { cache: "no-cache" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default function WorkwithUs() {
  const [logoURL, setLogoURL] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const strapiHomeData = await getStrapiData("/api/home-page?populate=*");
      const { Logo } = strapiHomeData.data.attributes;
      const logo = "http://localhost:1337" + Logo.data.attributes.url;

      const img = new Image();
      img.src = logo;
      img.onload = () => setLogoURL(logo);
    };
    fetchData();
  }, []);

  return (
    <div>
      
        <Nav  logoURL={logoURL} />

      {/* Second section */}
      <section className="min-h-[100vh] bg-[#F0FFFF] flex items-center justify-center">
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">Anything</h2>
        </div>
      </section>

      <Footer />
    </div>
  );
}
