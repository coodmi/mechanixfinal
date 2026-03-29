<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'mechanix@gmail.com'],
            [
                'name' => 'Mechanix',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        // Seed CMS content
        $this->call(CmsSeeder::class);
        
        // Seed About Us Certificates & Affiliations
        $this->call(AboutUsCertificatesSeeder::class);
        
        // Seed Projects
        $this->call(ProjectSeeder::class);
        
        // Seed Admin Activities
        $this->call(AdminActivitySeeder::class);
    }
}
