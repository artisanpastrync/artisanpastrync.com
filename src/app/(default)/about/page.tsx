import Image from 'next/image';

import { Section } from '@/components/Section';

const twoColumnsClassNames = 'grid md:grid-cols-2 gap-16 items-center justify-items-center';
const colors1ClassNames =
    'bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100';
const colors2ClassNames =
    'bg-primary-50 dark:bg-primary-950 text-primary-950 dark:text-primary-100';

export default function AboutPage() {
    return (
        <>
            <Section className={colors1ClassNames}>
                <Section.Content className={twoColumnsClassNames}>
                    <p>
                        Some of the best memories are made in the kitchen -- mixing, kneading, and
                        waiting for something wonderful to come out of the oven. At Artisan Pastry,
                        baking is more than a craft; it&apos;s a tradition that spans generations.
                    </p>
                    <Image
                        src='/images/chiffones.jpg'
                        alt='Our pillowy chiffon cake'
                        width='500'
                        height='500'
                    />
                </Section.Content>
            </Section>
            <Section className={colors2ClassNames}>
                <Section.Content className={twoColumnsClassNames}>
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
                        className='md:-order-1'
                    />
                </Section.Content>
            </Section>
            <Section className={colors1ClassNames}>
                <Section.Content className=''>
                    <p>
                        From delicate cookies to rich, buttery cakes, each bite tells a story. A
                        story one of home, heritage, and the joy of sharing something truly special.
                        Whether you&apos;re looking for a treat for yourself or something to bring
                        to the table, we&apos;re here to bake up something wonderful.
                    </p>
                </Section.Content>
            </Section>
            <Section className={colors2ClassNames}>
                <Section.Content className={twoColumnsClassNames}>
                    <p>
                        Every pastry we make is crafted from scratch with real, high-quality
                        ingredients—nothing artificial, just honest flavors. We focus on using the
                        best ingredients available, ensuring each bake is rich, flavorful, and made
                        with care.
                    </p>
                    <Image
                        src='/images/budin.jpg'
                        alt='Our syrupy bread pudding with raisins'
                        width='500'
                        height='500'
                    />
                </Section.Content>
            </Section>
            <Section className={colors1ClassNames}>
                <Section.Content className=''>
                    <p className='text-center'>
                        <strong>Welcome to Artisan Pastry.</strong> We hope you love what we create
                        as much as we love making it!
                    </p>
                </Section.Content>
            </Section>
        </>
    );
}
