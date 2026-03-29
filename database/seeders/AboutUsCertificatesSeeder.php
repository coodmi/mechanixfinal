<?php

namespace Database\Seeders;

use App\Models\PageSection;
use App\Models\PageContent;
use App\Models\PageItem;
use Illuminate\Database\Seeder;

class AboutUsCertificatesSeeder extends Seeder
{
    public function run(): void
    {
        // Certificates Section
        $certificatesSection = PageSection::firstOrCreate(
            ['section_key' => 'certificates', 'page' => 'about-us'],
            ['is_active' => true, 'order' => 6]
        );

        PageContent::updateOrCreate(
            ['section_id' => $certificatesSection->id, 'key' => 'title'],
            ['value' => 'Certifications & Awards', 'type' => 'text']
        );

        PageContent::updateOrCreate(
            ['section_id' => $certificatesSection->id, 'key' => 'description'],
            ['value' => 'Recognized excellence in interior design and project management', 'type' => 'text']
        );

        // Create certificate items with placeholder images
        $certificates = [
            ['image' => 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=300&h=200&fit=crop&auto=format', 'order' => 1],
            ['image' => 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=200&fit=crop&auto=format', 'order' => 2],
            ['image' => 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop&auto=format', 'order' => 3],
            ['image' => 'https://images.unsplash.com/photo-1552581234-26160f608093?w=300&h=200&fit=crop&auto=format', 'order' => 4],
        ];

        foreach ($certificates as $cert) {
            PageItem::updateOrCreate(
                ['page_section_id' => $certificatesSection->id, 'order' => $cert['order']],
                ['image' => $cert['image']]
            );
        }

        // Affiliations Section
        $affiliationsSection = PageSection::firstOrCreate(
            ['section_key' => 'affiliations', 'page' => 'about-us'],
            ['is_active' => true, 'order' => 7]
        );

        PageContent::updateOrCreate(
            ['section_id' => $affiliationsSection->id, 'key' => 'title'],
            ['value' => 'Professional Affiliations', 'type' => 'text']
        );

        PageContent::updateOrCreate(
            ['section_id' => $affiliationsSection->id, 'key' => 'description'],
            ['value' => 'Proud members of leading industry organizations', 'type' => 'text']
        );

        // Create affiliation items with placeholder images
        $affiliations = [
            ['image' => 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&h=200&fit=crop&auto=format', 'order' => 1],
            ['image' => 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=200&fit=crop&auto=format', 'order' => 2],
            ['image' => 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=200&fit=crop&auto=format', 'order' => 3],
            ['image' => 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=200&fit=crop&auto=format', 'order' => 4],
            ['image' => 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&h=200&fit=crop&auto=format', 'order' => 5],
        ];

        foreach ($affiliations as $aff) {
            PageItem::updateOrCreate(
                ['page_section_id' => $affiliationsSection->id, 'order' => $aff['order']],
                ['image' => $aff['image']]
            );
        }

        $this->command->info('About Us certificates and affiliations seeded successfully!');
    }
}
