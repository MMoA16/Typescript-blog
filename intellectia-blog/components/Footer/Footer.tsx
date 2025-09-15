import Link from 'next/link'

import styles from './Footer.module.css'; // Optional: for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import SocialIcons from '../SocialIcons';


const Footer = (): JSX.Element => {
	return (
		
			<div className="dark:bg-gray-800 px-20 py-4 mx-auto font-dm-sans">
				<div className="lg:flex">
				<div>
					<br></br>
		
								<Link href="/" className="text-gray-700 uppercase dark:text-white li-bulletremove">
										Intellectia
								</Link>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
				<SocialIcons/>
				
				</div>
			
                

					<div className="mt-6 px-30 lg:mt-0 lg:flex-1">
						<div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
							<div>
								<h3 className="text-gray-700 uppercase dark:text-white">About</h3>
								<a
									href="/AboutUs"
									className="block mt-2 text-sm text-gray-600 dark:text-gray-400 no-underline hover:no-underline">
									Company
								</a>
								<a
									href="/AboutUs"
									className="block mt-2 text-sm text-gray-600 dark:text-gray-400 no-underline hover:no-underline">
									Community
								</a>
								<Link href="/ContactUs/Careers" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 no-underline hover:no-underline">
								Careers
								</Link>
							</div>

							<div>
								<h3 className="text-gray-700 uppercase dark:text-white">Blog</h3>
								<a
									href="http://localhost:3000/Blogs/1"
									className="block mt-2 text-sm text-gray-600 dark:text-gray-400 no-underline hover:no-underline">
									Blogging journey
								</a>
								<a
									href="http://localhost:3000/Blogs/2"
									className="block mt-2 text-sm text-gray-600 dark:text-gray-400 no-underline hover:no-underline">
									Value of Place
								</a>
								<a
									href="http://localhost:3000/Blogs/3"
									className="block mt-2 text-sm text-gray-600 dark:text-gray-400 no-underline hover:no-underline">
									FDI Rules in India
								</a>
							</div>

							<div>
								<h3 className="text-gray-700 uppercase dark:text-white">
									Practices
								</h3>
								<a
									href="http://localhost:3000/Practices/1"
									className="block mt-2 text-sm text-gray-600 dark:text-gray-400 no-underline hover:no-underline">
									Intellectual Property Protection
								</a>
								<a
									href="http://localhost:3000/Practices/2"
									className="block mt-2 text-sm text-gray-600 dark:text-gray-400 no-underline hover:no-underline">
									Registration of Agreements
								</a>
								<a
									href="http://localhost:3000/Practices/3"
									className="block mt-2 text-sm text-gray-600 dark:text-gray-400 no-underline hover:no-underline">
									Contracts
								</a>
							</div>

							<div>
								<a href='tel:+919845097323' className="no-underline hover:no-underline">
								<h3 className="text-gray-700 uppercase dark:text-white">Contact</h3>
								<span className="block mt-2 text-sm text-gray-600 dark:text-gray-400">
									+91 9845097323
								</span>
								</a>
								<span className="block mt-2 text-sm text-gray-600 dark:text-gray-400">
									info@intellectia.net
								</span>
							</div>
						</div>
					</div>
				</div>

				<hr className="h-px my-6 bg-gray-300 border-none dark:bg-gray-700" />
				
				<div>
					<p className="text-center text-white dark:bg-gray-800">
						© Intellectia  {new Date().getFullYear()} - All rights reserved
					</p>
				</div>
			</div>

	)
}

export default Footer