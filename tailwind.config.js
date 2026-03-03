/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['Playfair Display', 'Georgia', 'serif'],
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                recipe: {
                    "primary": "#E85D04",
                    "primary-content": "#ffffff",
                    "secondary": "#1B1B1E",
                    "secondary-content": "#ffffff",
                    "accent": "#F48C06",
                    "accent-content": "#1B1B1E",
                    "neutral": "#1B1B1E",
                    "neutral-content": "#F5F5F5",
                    "base-100": "#FFFFFF",
                    "base-200": "#F8F8F8",
                    "base-300": "#EBEBEB",
                    "base-content": "#1B1B1E",
                    "info": "#3ABFF8",
                    "success": "#36D399",
                    "warning": "#FBBD23",
                    "error": "#F87272",
                    "--rounded-box": "0.75rem",
                    "--rounded-btn": "0.5rem",
                    "--rounded-badge": "1.9rem",
                },
            },
        ],
    },
}
