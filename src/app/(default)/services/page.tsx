import Image from 'next/image';

import { Section, SectionBackground, SectionContent } from '@/components';
import { Button } from '@/components/Button';

const twoColumnsClassNames = 'grid lg:grid-cols-2 gap-16 items-center justify-items-center';

export default function ServicesPage() {
    return (
        <>
            <Section>
                <SectionBackground color='primary-50' />
                <SectionContent className={twoColumnsClassNames}>
                    <div className='fex flex-row'>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aliquam dignissim enim eu sapien suscipit, id semper ipsum varius.
                            In placerat et enim at venenatis. Duis sodales lorem id risus
                            scelerisque, a ornare turpis tristique. Nunc ac elementum nunc. Donec
                            sem nulla, ornare a erat quis, dapibus scelerisque risus. Donec mollis
                            nisl id consequat efficitur. Pellentesque consequat consequat leo, non
                            commodo est bibendum eget. Morbi nec aliquet risus. Suspendisse nec
                            sagittis leo, sed aliquam diam. Aliquam id urna eu ipsum finibus lacinia
                            vel ut mauris. Nullam sodales vel orci id bibendum. Phasellus eu elit at
                            erat tempor mollis sit amet at arcu. Duis aliquam velit vitae ante
                            ultrices pellentesque a in libero. Pellentesque habitant morbi tristique
                            senectus et netus et malesuada fames ac turpis egestas.
                        </p>
                        <Button className='my-4' href='/services/cake'>Cakes</Button>
                    </div>
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
                    <div className='fex flex-row'>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aliquam dignissim enim eu sapien suscipit, id semper ipsum varius.
                            In placerat et enim at venenatis. Duis sodales lorem id risus
                            scelerisque, a ornare turpis tristique. Nunc ac elementum nunc. Donec
                            sem nulla, ornare a erat quis, dapibus scelerisque risus. Donec mollis
                            nisl id consequat efficitur. Pellentesque consequat consequat leo, non
                            commodo est bibendum eget. Morbi nec aliquet risus. Suspendisse nec
                            sagittis leo, sed aliquam diam. Aliquam id urna eu ipsum finibus lacinia
                            vel ut mauris. Nullam sodales vel orci id bibendum. Phasellus eu elit at
                            erat tempor mollis sit amet at arcu. Duis aliquam velit vitae ante
                            ultrices pellentesque a in libero. Pellentesque habitant morbi tristique
                            senectus et netus et malesuada fames ac turpis egestas.
                        </p>
                        <Button className='my-4' href='/services/pastry'>Pastries</Button>
                    </div>
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
