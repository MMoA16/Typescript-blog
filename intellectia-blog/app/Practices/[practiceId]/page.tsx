'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Nav from "@/components/nav";
import Footer from "@/components/Footer/Footer";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheckCircle, faUsers, faGavel, faShieldAlt, faBuilding, faHandshake } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// Practice area specific images and additional content
const practiceAreaImages: { [key: string]: string } = {
  "Corporate Law": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "Criminal Law": "https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "Family Law": "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "Employment Law": "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "Contract Law": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "Real Estate Law": "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
};

const practiceAreaIcons: { [key: string]: any } = {
  "Corporate Law": faBuilding,
  "Criminal Law": faGavel,
  "Family Law": faShieldAlt,
  "Employment Law": faUsers,
  "Contract Law": faHandshake,
  "Real Estate Law": faBuilding
};

const practiceAreaServices: { [key: string]: string[] } = {
  "Corporate Law": [
    "Corporate Formation & Structuring",
    "Mergers & Acquisitions",
    "Corporate Governance",
    "Securities Law Compliance",
    "Contract Negotiation",
    "Regulatory Compliance"
  ],
  "Criminal Law": [
    "Criminal Defense Representation",
    "White Collar Crime Defense",
    "DUI/DWI Defense",
    "Drug Crime Defense",
    "Assault & Battery Defense",
    "Appeals & Post-Conviction Relief"
  ],
  "Family Law": [
    "Divorce & Separation",
    "Child Custody & Support",
    "Adoption Proceedings",
    "Prenuptial Agreements",
    "Domestic Violence Protection",
    "Property Division"
  ],
  "Employment Law": [
    "Employment Contracts",
    "Workplace Discrimination",
    "Wrongful Termination",
    "Wage & Hour Disputes",
    "Sexual Harassment",
    "Workers' Compensation"
  ],
  "Contract Law": [
    "Contract Drafting & Review",
    "Breach of Contract",
    "Commercial Agreements",
    "Service Contracts",
    "Non-Disclosure Agreements",
    "Contract Negotiations"
  ],
  "Real Estate Law": [
    "Property Transactions",
    "Real Estate Litigation",
    "Zoning & Land Use",
    "Commercial Real Estate",
    "Property Development",
    "Landlord-Tenant Issues"
  ]
};

async function getStrapiData(url: string) {
  const baseURL = "http://localhost:1337";
  try {
    const response = await fetch(baseURL + url, { cache: 'no-cache' });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function PracticeAreaDetail() {
  const params = useParams();
  const practiceId = params.practiceId as string;
  
  const [practiceArea, setPracticeArea] = useState<any>(null);
  const [logoURL, setLogoURL] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  
  // Debug logging
  console.log('PracticeAreaDetail - params:', params);
  console.log('PracticeAreaDetail - practiceId:', practiceId);
  console.log('PracticeAreaDetail - typeof practiceId:', typeof practiceId);
  console.log('PracticeAreaDetail - User Agent:', typeof window !== 'undefined' ? window.navigator.userAgent : 'Server-side');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching practice area with ID:', practiceId);
        
        // Fetch practice area details - try both endpoints
        let practiceAreaData = await getStrapiData(`/api/practice-areas/${practiceId}?populate=*`);
        
        // If the first call doesn't work, try fetching all and filtering
        if (!practiceAreaData?.data) {
          console.log('Direct fetch failed, trying to fetch all practice areas');
          const allPracticeAreas = await getStrapiData('/api/practice-areas?populate=*');
          console.log('All practice areas:', allPracticeAreas);
          
          if (allPracticeAreas?.data) {
            const foundPractice = allPracticeAreas.data.find((practice: any) => 
              practice.id.toString() === practiceId.toString()
            );
            if (foundPractice) {
              practiceAreaData = { data: foundPractice };
              console.log('Found practice area:', foundPractice);
            }
          }
        }
        
        // Fetch logo
        const homeData = await getStrapiData("/api/home-page?populate=*");
        
        console.log('Practice area data:', practiceAreaData);
        
        if (practiceAreaData?.data) {
          setPracticeArea(practiceAreaData.data);
        } else {
          const errorMsg = `No practice area found for ID: ${practiceId}`;
          console.error(errorMsg);
          setError(errorMsg);
        }
        
        if (homeData?.data?.attributes?.Logo) {
          setLogoURL("http://localhost:1337" + homeData.data.attributes.Logo.data.attributes.url);
        }
      } catch (error) {
        const errorMsg = `Error fetching data: ${error}`;
        console.error(errorMsg);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    if (practiceId) {
      fetchData();
    }
  }, [practiceId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!practiceArea) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Practice Area Not Found</h1>
          <div className="mb-4 p-4 bg-gray-100 rounded-lg text-left text-sm">
            <p><strong>Debug Info:</strong></p>
            <p>Practice ID: {practiceId}</p>
            <p>Type: {typeof practiceId}</p>
            <p>Error: {error || 'No specific error'}</p>
            <p>User Agent: {typeof window !== 'undefined' ? (window.navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop') : 'Server'}</p>
          </div>
          <Link href="/Practices" className="text-blue-600 hover:text-blue-800 inline-block mb-2">
            ← Back to Practice Areas
          </Link>
          <br />
          <button 
            onClick={() => window.location.reload()} 
            className="text-green-600 hover:text-green-800"
          >
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  const title = practiceArea.attributes.title;
  const description = practiceArea.attributes.Description;
  const strapiImageUrl = "http://localhost:1337" + practiceArea.attributes.PracticeAreaImage.data.attributes.url;
  
  // Get additional content based on practice area title
  const heroImage = practiceAreaImages[title] || practiceAreaImages["Corporate Law"];
  const icon = practiceAreaIcons[title] || faGavel;
  const services = practiceAreaServices[title] || practiceAreaServices["Corporate Law"];

  return (
    <>
      <Nav logoURL={logoURL} />
      
      {/* Hero Section */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <FontAwesomeIcon 
                icon={icon} 
                className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 text-blue-400"
              />
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 sm:mb-4">{title}</h1>
              <p className="text-sm sm:text-lg lg:text-xl opacity-90">
                Expert legal services tailored to your specific needs
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Back Navigation */}
      {/* <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-6">
          <Link 
            href="/Practices" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back to Practice Areas
          </Link>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Overview</h2>
              <div className="prose prose-base sm:prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base font-dm-sans">
                  {description}
                </p>
                
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3 sm:mb-4">Our Approach</h3>
                  <p className="text-gray-700 text-sm sm:text-base font-dm-sans">
                    At Intellectia Legal Firm, we understand that every case is unique. Our experienced team 
                    provides personalized legal solutions that are tailored to meet your specific needs and 
                    objectives. We combine deep legal expertise with innovative strategies to achieve the best 
                    possible outcomes for our clients.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Key Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Key Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {services.map((service: string, index: number) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200"
                  >
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-base sm:text-lg flex-shrink-0" />
                    <span className="text-gray-700 font-medium text-sm sm:text-base">{service}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 sm:p-8 text-white text-center"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to Get Started?</h3>
              <p className="text-blue-100 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
                Our experienced {title.toLowerCase()} attorneys are ready to help you navigate your legal challenges 
                with confidence and expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/ContactUs">
                  <button className="bg-white text-blue-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200 text-sm sm:text-base">
                    Schedule Consultation
                  </button>
                </Link>
                <Link href="/Practices">
                  <button className="bg-white text-blue-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200 text-sm sm:text-base">
                    View All Practices
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Practice Area Image from Strapi */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 sm:mb-8">
                <img 
                  src={strapiImageUrl} 
                  alt={title}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <div className="p-4 sm:p-6">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">{title}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Professional legal representation you can trust
                  </p>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
                <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Why Choose Us</h4>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-start space-x-2 sm:space-x-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500 text-xs sm:text-sm mt-1 flex-shrink-0" />
                    <span className="text-gray-600 text-xs sm:text-sm">25+ years of legal experience</span>
                  </li>
                  <li className="flex items-start space-x-2 sm:space-x-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500 text-xs sm:text-sm mt-1 flex-shrink-0" />
                    <span className="text-gray-600 text-xs sm:text-sm">Proven track record of success</span>
                  </li>
                  <li className="flex items-start space-x-2 sm:space-x-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500 text-xs sm:text-sm mt-1 flex-shrink-0" />
                    <span className="text-gray-600 text-xs sm:text-sm">Personalized approach to each case</span>
                  </li>
                  <li className="flex items-start space-x-2 sm:space-x-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500 text-xs sm:text-sm mt-1 flex-shrink-0" />
                    <span className="text-gray-600 text-xs sm:text-sm">24/7 availability for urgent matters</span>
                  </li>
                </ul>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 sm:p-6 text-white text-center">
                <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Need Legal Assistance?</h4>
                <p className="text-blue-100 mb-3 sm:mb-4 text-xs sm:text-sm">
                  Get expert legal advice for your {title.toLowerCase()} matters
                </p>
                <Link 
                  href="/ContactUs"
                  className="inline-block bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200 text-xs sm:text-sm"
                >
                  Contact Us Today
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
