/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        authInterrupts: true,
    },
    images: {
        remotePatterns: [{ hostname: '*' }],
    },
};

export default nextConfig;
