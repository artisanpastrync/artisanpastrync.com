import Image from 'next/image';

import { Section, SectionBackground, SectionContent } from '@/components/Section';

const twoColumnsClassNames = 'grid lg:grid-cols-2 gap-16 items-center justify-items-center';

export default function AboutPage() {
    return (
        <>
            <Section>
                <SectionBackground color='primary-50' />
                <SectionContent className={twoColumnsClassNames}>
                    <p>
                        Artisan Pastry LLC is a small, independent pastry shop proudly owned and
                        operated by a mother-daughter duo in Wake Forest. We attend monthly
                        farmers&apos; markets, bringing our delightful treats directly to the
                        community. Inspired by the absence of quality pastry shops in the Triangle,
                        we saw a unique opportunity to share our passion for baking here in the
                        South. Originally from Long Island, NY, where diverse culinary options
                        abound, we bring a touch of that rich cultural heritage to our new home.
                    </p>
                    <Image
                        src='/images/chiffones.jpg'
                        alt='Our pillowy chiffon cake'
                        width='500'
                        height='500'
                    />
                </SectionContent>
            </Section>
            <Section>
                <SectionBackground color='primary-100' />
                <SectionContent className={twoColumnsClassNames}>
                    <p>
                        Artisan Pastry was born from my great-grandmother&apos;s traditional baking
                        methods, which included a cherished collection of cookie, cake, and pastry
                        recipes. My mother compiled these beloved recipes into a book, inspiring me
                        to open this business with her. Together, we aim to share our delicious
                        pastries with our local communities and beyond.
                    </p>
                    <Image
                        src='/images/alfajor.jpg'
                        alt='Our buttery Peruvian Alfajor cookies filled with dulce de leche'
                        width='500'
                        height='500'
                        className='lg:-order-1'
                    />
                </SectionContent>
            </Section>
            <Section>
                <SectionBackground color='primary-50' />
                <SectionContent className={twoColumnsClassNames}>
                    <p>
                        We take pride in using high-quality, seasonal, and locally sourced
                        ingredients. Our cookies, cakes, and pastries are made from scratch, using
                        only whole and real ingredients. Unlike most pastry shops, we stand out for
                        our commitment to authenticity and quality in every bake.
                    </p>
                    <Image
                        src='/images/budin.jpg'
                        alt='Our syrupy bread putting with raisins'
                        width='500'
                        height='500'
                    />
                </SectionContent>
            </Section>
        </>
    );
}
