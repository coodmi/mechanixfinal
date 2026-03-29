<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Ensure PHP upload limits are sufficient for admin uploads
        @ini_set('upload_max_filesize', '32M');
        @ini_set('post_max_size', '36M');
        @ini_set('memory_limit', '512M');
    }
}
