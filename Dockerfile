# --- Stage 1: Build des assets Node.js (Inertia/React) ---
FROM node:20-alpine AS asset-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# --- Stage 2: Production PHP/Nginx ---
FROM php:8.4-fpm-alpine 

# Installer les extensions PHP nécessaires pour PostgreSQL, Laravel et DOMPDF (GD)
RUN apk add --no-cache nginx supervisor curl libpq-dev nodejs npm \
    libpng-dev libjpeg-turbo-dev freetype-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_pgsql gd

# Configurer Nginx et Supervisor
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Définir le dossier de travail
WORKDIR /var/www/html

# Copier le code de l'application
COPY . .
# Copier les assets compilés depuis le Stage 1
COPY --from=asset-builder /app/public/build ./public/build
COPY --from=asset-builder /app/bootstrap/ssr ./bootstrap/ssr

# Installer Composer et les dépendances PHP
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Installer les dépendances npm de production (nécessaires pour le serveur SSR Node.js)
COPY --from=asset-builder /app/package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps


# Donner les bons droits d'accès (storage, cache, icônes publiques et ssr)
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/bootstrap/ssr \
    && chmod -R 755 /var/www/html/public/icon \
    && chmod -R 755 /var/www/html/public/build

# Exposer le script de démarrage
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]