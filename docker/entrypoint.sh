#!/bin/sh

# Remplacer le port dans la configuration Nginx par la variable environnement $PORT de Cloud Run
sed -i "s/\${PORT}/${PORT:-8080}/g" /etc/nginx/nginx.conf

# Optimiser la configuration Laravel pour la prod
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Lancer supervisor
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf