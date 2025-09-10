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
						<div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
							<div>
								<h3 className="text-gray-700 uppercase dark:text-white">About</h3>
								<a
									href="#"
									className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
									Company
								</a>
								<a
									href="#"
									className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
									community
								</a>
								{/* <a
									href="#Careers"
									className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
									Careers
								</a> */}

								<Link href="/ContactUs/Careers" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
								Careers
								</Link>
							</div>

							<div>
								<h3 className="text-gray-700 uppercase dark:text-white">Blog</h3>
								<a
									href="#"
									className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
									Tec
								</a>
								<a
									href="#"
									className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
									Music
								</a>
								<a
									href="#"
									className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
									Videos
								</a>
							</div>

							<div>
								<h3 className="text-gray-700 uppercase dark:text-white">
									Products
								</h3>
								<a
									href="#"
									className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
									Mega cloud
								</a>
								<a
									href="#"
									className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
									Aperion UI
								</a>
								<a
									href="#"
									className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
									Meraki UI
								</a>
							</div>

							<div>
								<a href='tel:+919849792800'>
									<h3 className="text-gray-700 uppercase dark:text-white">Contact</h3>
									<span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
										+91 9849792800
								</span>
								</a>
								<span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
									example@email.com
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