import type { Config } from 'tailwindcss';

export default {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            // https://uicolors.app/create
            colors: {
                primary: {
                    DEFAULT: '#e2a55f',
                    '50': '#fcf8f0',
                    '100': '#f9efdb',
                    '200': '#f2dbb6',
                    '300': '#eac287',
                    '400': '#e2a55f',
                    '500': '#d98736',
                    '600': '#cb6f2b',
                    '700': '#a95725',
                    '800': '#874525',
                    '900': '#6d3a21',
                    '950': '#3b1d0f',
                },
                // secondary: {
                //     light: '#C98660',
                //     // DEFAULT: '#FFD2D2',
                //     DEFAULT: '#FBF5E8',
                //     light: '#FFE5DC',
                // },
            },
        },
    },
    plugins: [],
} satisfies Config;
