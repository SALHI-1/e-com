<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Ourélia') }}</title>
        
        {{-- Default SEO Meta Tags --}}
        <meta name="description" content="Découvrez notre boutique en ligne avec les meilleurs produits au meilleur prix.">
        <meta name="keywords" content="e-commerce, boutique, achat en ligne">
        <meta name="robots" content="index, follow">
        <meta name="author" content="{{ config('app.name', 'Ourélia') }}">

        {{-- Open Graph / Facebook --}}
        <meta property="og:type" content="website">
        <meta property="og:title" content="{{ config('app.name', 'Ourélia') }}">
        <meta property="og:description" content="Découvrez notre boutique en ligne avec les meilleurs produits au meilleur prix.">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:site_name" content="{{ config('app.name', 'Ourélia') }}">
        
        {{-- Twitter --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ config('app.name', 'Ourélia') }}">
        <meta name="twitter:description" content="Découvrez notre boutique en ligne avec les meilleurs produits au meilleur prix.">

        {{-- Schema.org JSON-LD — Données structurées pour Google --}}
        <script type="application/ld+json">
        {
            "@@context": "https://schema.org",
            "@@graph": [
                {
                    "@@type": "Organization",
                    "@@id": "{{ url('/') }}/#organization",
                    "name": "Ourélia",
                    "alternateName": "Ourelia Beauty",
                    "url": "{{ url('/') }}",
                    "logo": {
                        "@@type": "ImageObject",
                        "url": "{{ asset('icon/android-chrome-192x192.png') }}",
                        "width": 192,
                        "height": 192
                    },
                    "description": "Ourélia est une boutique de beauté en ligne proposant des soins visage, parfums, maquillage, soins corps et soins capillaires de qualité premium.",
                    "foundingDate": "2024",
                    "sameAs": []
                },
                {
                    "@@type": "WebSite",
                    "@@id": "{{ url('/') }}/#website",
                    "url": "{{ url('/') }}",
                    "name": "Ourélia",
                    "description": "Boutique beauté en ligne — soins visage, parfums, maquillage, corps & bain, soins capillaires.",
                    "publisher": {
                        "@@id": "{{ url('/') }}/#organization"
                    },
                    "potentialAction": {
                        "@@type": "SearchAction",
                        "target": {
                            "@@type": "EntryPoint",
                            "urlTemplate": "{{ url('/') }}?q={search_term_string}"
                        },
                        "query-input": "required name=search_term_string"
                    },
                    "inLanguage": "fr-MA"
                },
                {
                    "@@type": "OnlineStore",
                    "@@id": "{{ url('/') }}/#store",
                    "name": "Ourélia",
                    "url": "{{ url('/') }}",
                    "currenciesAccepted": "MAD",
                    "priceRange": "$$",
                    "description": "Boutique beauté en ligne proposant des produits de soin visage, parfums, maquillage, corps & bain et soins capillaires.",
                    "parentOrganization": {
                        "@@id": "{{ url('/') }}/#organization"
                    }
                }
            ]
        }
        </script>

        {{-- Favicon — affiché dans l'onglet du navigateur (dev & prod, espace admin & client) --}}
        <link rel="shortcut icon" href="{{ asset('icon/favicon.ico') }}" type="image/x-icon">
        <link rel="icon" type="image/png" sizes="16x16"  href="{{ asset('icon/favicon-16x16.png') }}">
        <link rel="icon" type="image/png" sizes="32x32"  href="{{ asset('icon/favicon-32x32.png') }}">
        <link rel="icon" type="image/png" sizes="48x48"  href="{{ asset('icon/favicon-48x48.png') }}">
        <link rel="icon" type="image/png" sizes="64x64"  href="{{ asset('icon/favicon-64x64.png') }}">
        <link rel="icon" type="image/png" sizes="192x192" href="{{ asset('icon/android-chrome-192x192.png') }}">
        <link rel="apple-touch-icon" sizes="180x180"      href="{{ asset('icon/apple-touch-icon-180x180.png') }}">
        <link rel="manifest" href="/site.webmanifest">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
