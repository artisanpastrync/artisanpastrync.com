import { Section } from "@/components/Section/Section";
import { HTMLProps } from "react";

export default function Home() {
    return (
        <Section
            background={<VideoBackground />}
            // overlay={<BackgroundOverlay />}
        >
            <h1 className='text-3xl font-bold text-white'>The Section</h1>
        </Section>
    );
}

// interface BackgroundOverlayProps {}

// function BackgroundOverlay({}: BackgroundOverlayProps) {
//     return (
//         <div className='bg-gradient-to-t from-[#E7CAA9] w-full h-full'></div>
//     );
// }

interface VideoBackgroundProps extends HTMLProps<HTMLVideoElement> {}

function VideoBackground({
    autoPlay = true,
    loop = true,
    muted = true,
    playsInline = true,
    ...rest
}: VideoBackgroundProps) {
    const props = { autoPlay, loop, muted, playsInline, ...rest };
    return (
        <video src='/assets/hero-video.mp4' className='h-screen' {...props} />
    );
}
