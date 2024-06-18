import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { Section } from '@/components/Section';

export default function Home() {
    return (
        <>
            
                    <h1 className='text-5xl font-bold'>Fine Baked Goods from Wake Forest, NC</h1>
                    <p className='text-2xl'>Taste the difference of our family&apos;s recipes</p>
                    <div className='flex flex-col sm:flex-row gap-4 '>
                        <Button href='/about' variant='outlined'>
                            About Us
                        </Button>
                        <Button variant='inverted'>Order Now!</Button>
                    </div>
                
        </>
    );
}
