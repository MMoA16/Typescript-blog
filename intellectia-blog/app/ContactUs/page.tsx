import Nav from "@/components/nav";
import Footer from "@/components/Footer/Footer";
import Divider from "@/components/divider";
import type { NextPage } from "next";

export type ContactContainerType = {
  className?: string;
};

async function getStrapiData(url: string) {
  const baseURL = "http://localhost:1337";
  try {
    const response = await fetch(baseURL + url, { cache: 'no-cache' });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

const ContactUs: NextPage<ContactContainerType> = async () => {
  const strapiHomeData = await getStrapiData("/api/home-page?populate=*");
  const { Title,Logo } = strapiHomeData.data.attributes;
  const logoURL="http://localhost:1337"+Logo.data.attributes.url

  return (
    <>
      <Nav logoURL={logoURL} />

      <div className=" dark:bg-gray-800 text-white flex flex-row flex-wrap py-15 md:w-full md:py-16 md:flex-row md:items-center bg-gray-100 justify-center" >
      <div className="flex items-center justify-center w-1/2 px-20 md:w-full h-full">
  <h2 className="text-4xl text-white font-dm-sans text-center">
    Contact Us
  </h2> 
</div>
        <div className="w-1/2 px-20 py-2">
          <div className="max-w-lg">
            

            <form className="space-y-6">
              <div className="mt-4">
                <label htmlFor="name" className="block text-sm font-medium text-white-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium text-white-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="block text-sm font-medium text-white-700">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
              
              <div className="mt-4">
  <button
    type="submit"
    className="bg-indigo-600 text-gray px-7 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
  >
    Send Message
  </button>
</div>

            </form>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-row flex-wrap justify-center 
      px-20 py-20 bg-gray-500 text-gray-800">
  {/* Media Enquiry Box */}
  <div className="flex-1 dark:bg-gray-800 rounded-lg p-6">
    <h3 className="text-xl font-semibold mb-3 text-center text-white">Media Enquiry</h3>
    <p className="mb-4 text-center text-white">
      Reach out to our media team for press-related information or interview requests.
    </p>
    <div className="flex justify-center">
      <button className="bg-indigo-600 text-black px-5 py-2 rounded-md hover:bg-indigo-700 transition mt-3">
        Contact Media Team
      </button>
    </div>
  </div>
  

  {/* Career Enquiry Box */}
  <div className="flex-1 dark:bg-gray-800 rounded-lg p-6">
    <h3 className="text-xl font-semibold mb-3 text-center text-white">Career Enquiry</h3>
    <p className="mb-4 text-center text-white">
      Looking to join our team? Contact HR for open positions or internships.
    </p>
    <div className="flex justify-center text-white">
      <button className="bg-indigo-600 text-black px-5 py-2 rounded-md hover:bg-indigo-700 transition mt-3">
        Contact HR
      </button>
    </div>
  </div>
</div>

      <Divider />

      <div className="px-20 py-10 bg-white text-gray-700">
        <h3 className="text-xl font-semibold mb-2">Office Address</h3>
        <p>123 Main Street, Mumbai, Maharashtra, India</p>
        <p className="mt-2">Phone: +91-9876543210</p>
        <p>Email: contact@bodhankarassociates.com</p>
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
