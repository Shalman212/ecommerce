// postcss.config.js
import tailwindcssPostcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
    plugins: [
        tailwindcssPostcss, // No need to pass tailwindConfig here; it should find it automatically
        autoprefixer,
        // Add other PostCSS plugins here if you have them
    ],
};