import Image from "next/image";

export const Logo = () => {
    return (
        <Image
            src='/assets/artisan-pastry.svg'
            alt='Artisan Pastry Logo'
            fill
            priority
        />
    );
};
