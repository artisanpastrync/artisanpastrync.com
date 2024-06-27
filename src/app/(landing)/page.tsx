import Image from 'next/image';

import { Button } from '@/components/Button';
import { Section, SectionBackground, SectionContent, SectionOverlay } from '@/components/Section';

export default function Home() {
    return (
        <>
            <Section className='h-screen'>
                <SectionBackground video='/assets/hero-video.mp4' />
                <SectionOverlay className='bg-primary-900' opacity={0.5} />
                <SectionContent className='pt-20 text-primary-100 flex flex-col align-center justify-center gap-4'>
                    <h1 className='text-5xl font-bold'>Fine Baked Goods from Wake Forest, NC</h1>
                    <p className='text-2xl'>Taste the difference of our family&apos;s recipes</p>
                    <div className='flex flex-col sm:flex-row gap-4 '>
                        <Button href='/about' variant='outlined'>
                            About Us
                        </Button>
                        <Button variant='inverted'>Order Now!</Button>
                    </div>
                </SectionContent>
            </Section>
            <Section>
                <SectionContent className='grid lg:grid-cols-2 gap-16 items-center justify-items-center'>
                    <div>
                        <p>
                            Artisan Pastry LLC is a women-owned, mother-daughter pastry shop based
                            in Wake Forest, NC. Inspired by a lack of quality pastry shops in the
                            Triangle and our rich baking heritage, we offer a variety of cookies,
                            cakes, and pastries. All treats are made from scratch with high-quality,
                            seasonal, and locally sourced ingredients, setting us apart with our
                            commitment to whole, real ingredients. We also participate in monthly
                            farmers&apos; markets to connect with the community.
                        </p>
                        <Button href='/about' className='mt-8'>
                            Learn More
                        </Button>
                    </div>
                    <Image
                        src='/images/chiffon.jpg'
                        alt='Our pillowy soft chiffon cake'
                        width='500'
                        height='500'
                    />
                </SectionContent>
            </Section>
        </>
    );
}
