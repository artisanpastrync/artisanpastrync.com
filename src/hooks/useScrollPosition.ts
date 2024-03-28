import { useEffect, useState } from "react";

export interface ScrollPos {
    scrollX: number;
    scrollY: number;
}

export const useScrollPos = (): ScrollPos => {
    const [position, setPosition] = useState<ScrollPos>({
        scrollX: 0,
        scrollY: 0,
    });

    useEffect(() => {
        const onScroll = () => {
            setPosition({ scrollX: window.scrollX, scrollY: window.scrollY });
        };

        if (typeof window !== "undefined") {
            window.addEventListener("scroll", onScroll);

            return () => window.removeEventListener("scroll", onScroll);
        }
    }, []);

    return position;
};
