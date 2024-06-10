import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { Section } from '@/components/Section';

export default function Home() {
    return (
        <>
            <Navbar />
            <Section className='h-screen'>
                <Section.Background video='/assets/hero-video.mp4' />
                <Section.Overlay className='bg-primary-900' opacity={0.5} />
                <Section.Content className='pt-20 text-primary-100 flex flex-col align-center justify-center gap-4'>
                    <h1 className='text-5xl font-bold'>Fine Baked Goods from Wake Forest, NC</h1>
                    <p className='text-2xl'>Taste the difference of our family&apos;s recipes</p>
                    <div className='flex flex-col sm:flex-row gap-4 '>
                        <Button href='/about' variant='outlined'>
                            About Us
                        </Button>
                        <Button variant='inverted'>Order Now!</Button>
                    </div>
                </Section.Content>
            </Section>
            <Section style={{ height: '1000px' }}>
                <Section.Background color='' />
                <Section.Overlay
                    opacity={1}
                    className='bg-gradient-to-tr from-primary-200 to-primary-800'
                />
                <Section.Content></Section.Content>
            </Section>
            <Footer />
        </>
    );
}
