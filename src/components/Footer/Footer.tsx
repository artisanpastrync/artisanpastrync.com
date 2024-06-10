import Link from 'next/link';

import { Button } from '../Button';
// import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
    return (
        <footer className='bg-primary-950 text-primary-50'>
            <div className='container mx-auto px-4 py-8'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                    {/* Description Section */}
                    <div>
                        <h2 className='text-xl font-bold mb-4'>About Artisan Pastry</h2>
                        <p>
                            Artisan Pastry is a home bakery offering delicious handmade pastries.
                            Our commitment to quality and freshness is our top priority. We use only
                            the finest ingredients to ensure every bite is a delight.
                        </p>
                    </div>

                    {/* Newsletter Section */}
                    <div>
                        <h2 className='text-xl font-bold mb-4'>Newsletter</h2>
                        <form className='flex flex-col'>
                            <input
                                type='email'
                                placeholder='Your email'
                                className='px-4 py-2 mb-2 bg-primary-900 text-primary-50 rounded-md placeholder:text-primary-400'
                            />
                            <Button type='submit' variant='solid' className='px-4 py-2 rounded-md'>
                                Subscribe
                            </Button>
                        </form>
                    </div>

                    {/* Links Section */}
                    <div>
                        <h2 className='text-xl font-bold mb-4'>Quick Links</h2>
                        <ul className='space-y-2'>
                            <li>
                                <Link href='/about' className='hover:underline'>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href='/services' className='hover:underline'>
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href='/contact' className='hover:underline'>
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href='/faq' className='hover:underline'>
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links Section */}
                    <div>
                        <h2 className='text-xl font-bold mb-4'>Follow Us</h2>
                        <div className='flex space-x-4'>
                            <Link
                                href='https://facebook.com'
                                className='text-gray-400 hover:text-white transition-colors'
                            >
                                {/* <FaFacebook size={24} /> */}
                            </Link>
                            <Link
                                href='https://twitter.com'
                                className='text-gray-400 hover:text-white transition-colors'
                            >
                                {/* <FaTwitter size={24} /> */}
                            </Link>
                            <Link
                                href='https://instagram.com'
                                className='text-gray-400 hover:text-white transition-colors'
                            >
                                {/* <FaInstagram size={24} /> */}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Legal Section */}
                <div className='border-t border-primary-900 mt-8 pt-4'>
                    <div className='flex flex-col md:flex-row justify-between items-center'>
                        <p>
                            &copy; {new Date().getFullYear()} Artisan Pastry. All rights reserved.
                        </p>
                        <div className='flex space-x-4'>
                            <Link href='/privacy' className='hover:underline'>
                                Privacy Policy
                            </Link>
                            <Link href='/terms' className='hover:underline'>
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
