# Mechanix

Mechanix is a product of Nex Group and Developed by Alphainno.

## Zip with windows 7-Zip

```bash
php artisan key:generate && php artisan migrate:fresh --seed && rm -rf public/storage && php artisan storage:link && npm run build && "/c/Program Files/7-Zip/7z.exe" a -tzip ../mechanix.zip . '-xr!node_modules' '-xr!.git' -mx=1
```

### Cpanle Deploy

```bash
php artisan key:generate && php artisan migrate:fresh --seed && rm -rf public/storage && php artisan storage:link
```
