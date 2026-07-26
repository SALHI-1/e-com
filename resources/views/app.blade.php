<!DOCTYPE html>
<html lang="fr">
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
                    "@@type": ["Organization", "Store", "HealthAndBeautyBusiness"],
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
                    "image": "{{ asset('icon/android-chrome-192x192.png') }}",
                    "description": "Ourélia est une boutique de beauté en ligne proposant des soins visage, parfums, maquillage, soins corps et soins capillaires de qualité premium.",
                    "priceRange": "$$",
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
                    "inLanguage": "fr"
                }
            ]
        }
        </script>

        {{-- Favicon — affiché dans l'onglet du navigateur (dev & prod, espace admin & client) --}}
        <link rel="icon" href="{{ asset('icon/favicon.ico') }}" sizes="any">
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

        <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-3DKLYM30N1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      // IMPORTANT POUR INERTIA : On désactive la vue de page automatique
      gtag('config', 'G-3DKLYM30N1', { send_page_view: false });
    </script>


    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
