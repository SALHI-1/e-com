import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
    ],
    ssr: {
        // Ces packages sont en devDependencies mais importés dans les pages SSR.
        // On les bundle dans le fichier ssr.js pour qu'ils soient disponibles
        // sans node_modules en production.
        noExternal: ['laravel-vite-plugin', '@headlessui/react'],
    },
    server: {
        // 1. Autorise le CORS pour que l'URL Ngrok puisse lire les fichiers de Vite
        cors: true,

        // 2. Force le HMR à utiliser l'IP locale pour éviter les déconnexions 
        // du WebSocket de rafraîchissement automatique derrière le tunnel
        hmr: {
            host: '127.0.0.1',
        },
    },
});

