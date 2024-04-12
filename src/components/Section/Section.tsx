import { PropsWithChildren, ReactNode } from 'react';

import './section.css';

export interface SectionProps {
    background?: ReactNode;
    // overlay?: ReactNode;
}

export const Section = ({
    background,
    children,
    // overlay,
}: PropsWithChildren<SectionProps>) => {
    return (
        <section className='section relative'>
            <div className='section_background absolute inset-0'>
                {background}
            </div>
            {/* <div className='section_overlay absolute inset-0 h-screen'>
                {overlay}
            </div> */}
            <div className='section_content md:mx-auto container px-8 relative'>
                {children}
            </div>
        </section>
    );
};
