import { Mail } from 'lucide-react';
import Link from 'next/link';

import { AuthButton } from '@/components/auth/auth-button';
import { LINKS } from '@/constants/navigation';
import { Button } from '@/components/ui/button';

export const Footer = () => {
    return (
        <footer className='bg-primary-950 text-primary-50'>
            <div className='container mx-auto px-4 py-8'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                    <div>
                        <h2 className='text-xl font-bold mb-4'>About Us</h2>
                        <p>
                            Artisan Pastry is a family-owned bakery in Wake Forest, dedicated to
                            crafting handmade pastries with real ingredients and timeless recipes.
                            Every treat is baked with care, tradition, and a love for sharing
                            something delicious.
                        </p>
                    </div>

                    <div>
                        <h2 className='text-xl font-bold mb-4'>Newsletter</h2>
                        <form className='flex flex-col'>
                            <input
                                type='email'
                                placeholder='Your email'
                                className='px-4 py-2 mb-2 bg-primary-900 text-primary-50 rounded-md placeholder:text-primary-400'
                            />
                            <Button
                                type='submit'
                                variant='default'
                                className='px-4 py-2 rounded-md gap-2 cursor-pointer'
                            >
                                <Mail />
                                Subscribe
                            </Button>
                        </form>
                    </div>

                    {/* Links Section */}
                    <div>
                        <h2 className='text-xl font-bold mb-4'>Quick Links</h2>
                        <ul className='space-y-2'>
                            {LINKS.map(({ href, label }, index) => (
                                <li key={index}>
                                    <Button asChild variant='ghost'>
                                        <Link href={href}>{label}</Link>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links Section */}
                    <div>
                        <h2 className='text-xl font-bold mb-4'>Follow Us</h2>
                        <AuthButton />
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
