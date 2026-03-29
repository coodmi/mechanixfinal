<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    // Curated Unsplash image IDs per category (direct download URLs)
    private array $images = [
        'Residential' => [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
        ],
        'Commercial' => [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
            'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80',
            'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
        ],
        'Restaurant' => [
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
            'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
            'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
            'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
        ],
        'Hotel & Resort' => [
            'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
            'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
            'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
        ],
        'Duplex' => [
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
            'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
            'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80',
        ],
        'Architecture' => [
            'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
            'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
            'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80',
            'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&q=80',
            'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
        ],
        'Construction' => [
            'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
            'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
            'https://images.unsplash.com/photo-1590644365607-5f3e8e7e3b3e?w=800&q=80',
            'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        ],
    ];

    private array $projects = [
        'Residential' => [
            ['title' => 'Modern Villa Design', 'location' => 'Gulshan, Dhaka', 'description' => 'A stunning modern villa featuring open-plan living spaces, floor-to-ceiling windows, and a seamless indoor-outdoor connection. The design emphasizes natural light and premium finishes throughout.', 'is_featured' => true],
            ['title' => 'Luxury Penthouse Interior', 'location' => 'Banani, Dhaka', 'description' => 'An exclusive penthouse redesign with panoramic city views. Custom millwork, imported marble, and bespoke furniture create an atmosphere of refined luxury.', 'is_featured' => false],
            ['title' => 'Contemporary Family Home', 'location' => 'Dhanmondi, Dhaka', 'description' => 'A warm and functional family residence blending contemporary aesthetics with practical living. Thoughtful storage solutions and child-friendly spaces throughout.', 'is_featured' => false],
            ['title' => 'Minimalist Apartment Renovation', 'location' => 'Uttara, Dhaka', 'description' => 'A complete apartment transformation embracing minimalist principles. Clean lines, neutral palette, and carefully curated furnishings create a serene urban retreat.', 'is_featured' => false],
            ['title' => 'Heritage Bungalow Restoration', 'location' => 'Old Dhaka', 'description' => 'Sensitive restoration of a colonial-era bungalow preserving original architectural details while introducing modern comforts and updated systems.', 'is_featured' => true],
        ],
        'Commercial' => [
            ['title' => 'Corporate Headquarters', 'location' => 'Motijheel, Dhaka', 'description' => 'A flagship corporate office designed to inspire productivity and reflect brand identity. Flexible workspaces, collaborative zones, and executive suites across 12 floors.', 'is_featured' => true],
            ['title' => 'Boutique Retail Store', 'location' => 'Gulshan 2, Dhaka', 'description' => 'A high-end retail environment designed to elevate the shopping experience. Custom display fixtures, atmospheric lighting, and a curated material palette.', 'is_featured' => false],
            ['title' => 'Tech Startup Office', 'location' => 'Bashundhara, Dhaka', 'description' => 'A dynamic workspace for a fast-growing tech company. Open collaboration areas, private focus pods, and vibrant breakout spaces foster creativity and innovation.', 'is_featured' => false],
            ['title' => 'Financial Services Tower', 'location' => 'Dilkusha, Dhaka', 'description' => 'Premium office interiors for a leading financial institution. Sophisticated design language communicates trust and professionalism across all client-facing areas.', 'is_featured' => false],
            ['title' => 'Co-working Space Design', 'location' => 'Mirpur, Dhaka', 'description' => 'A vibrant co-working facility accommodating diverse work styles. Hot desks, private offices, meeting rooms, and a community lounge create a thriving professional ecosystem.', 'is_featured' => false],
        ],
        'Restaurant' => [
            ['title' => 'Fine Dining Restaurant', 'location' => 'Gulshan 1, Dhaka', 'description' => 'An intimate fine dining space where culinary artistry meets interior excellence. Bespoke lighting, acoustic panels, and custom furniture create an unforgettable dining atmosphere.', 'is_featured' => true],
            ['title' => 'Rooftop Café & Bar', 'location' => 'Banani, Dhaka', 'description' => 'A stylish rooftop venue with panoramic city views. Industrial-chic design elements, lush greenery, and flexible seating accommodate both casual dining and private events.', 'is_featured' => false],
            ['title' => 'Traditional Cuisine Restaurant', 'location' => 'Dhanmondi, Dhaka', 'description' => 'A celebration of local culinary heritage through thoughtful interior design. Traditional motifs reimagined in a contemporary context create an authentic yet modern dining experience.', 'is_featured' => false],
            ['title' => 'Fast Casual Dining Chain', 'location' => 'Uttara, Dhaka', 'description' => 'A scalable design concept for a fast-casual restaurant chain. Efficient layouts, durable materials, and strong brand expression across multiple locations.', 'is_featured' => false],
            ['title' => 'Waterfront Seafood Restaurant', 'location' => 'Hatirjheel, Dhaka', 'description' => 'A stunning waterfront dining destination with unobstructed lake views. Natural materials, nautical references, and an open kitchen create a memorable seafood experience.', 'is_featured' => false],
        ],
        'Hotel & Resort' => [
            ['title' => 'Boutique City Hotel', 'location' => 'Karwan Bazar, Dhaka', 'description' => 'A 45-room boutique hotel with a distinct personality. Each floor tells a different story through art and design, creating a unique guest experience in the heart of the city.', 'is_featured' => true],
            ['title' => 'Luxury Resort Villas', 'location' => "Cox's Bazar", 'description' => 'Exclusive beachfront villas designed to maximize ocean views and natural ventilation. Local materials and craftsmanship celebrate the coastal setting.', 'is_featured' => false],
            ['title' => 'Business Hotel Renovation', 'location' => 'Tejgaon, Dhaka', 'description' => 'Complete renovation of a 200-room business hotel. Updated guestrooms, reimagined public spaces, and a new F&B concept revitalize this established property.', 'is_featured' => false],
            ['title' => 'Eco Resort Design', 'location' => 'Sylhet', 'description' => 'A sustainable resort nestled in the tea gardens of Sylhet. Passive design strategies, local materials, and minimal environmental impact define this eco-conscious retreat.', 'is_featured' => false],
            ['title' => 'Heritage Hotel Conversion', 'location' => 'Rajshahi', 'description' => 'Adaptive reuse of a historic mansion into a luxury heritage hotel. Original architectural features are preserved and celebrated alongside contemporary hospitality amenities.', 'is_featured' => false],
        ],
        'Duplex' => [
            ['title' => 'Contemporary Duplex Home', 'location' => 'Bashundhara, Dhaka', 'description' => 'A sophisticated duplex residence with double-height living spaces and a dramatic staircase as the central design feature. Premium finishes and smart home integration throughout.', 'is_featured' => true],
            ['title' => 'Urban Duplex Loft', 'location' => 'Mirpur DOHS, Dhaka', 'description' => 'An industrial-inspired duplex loft conversion with exposed concrete, steel elements, and expansive glazing. The open-plan layout maximizes the sense of space.', 'is_featured' => false],
            ['title' => 'Garden Duplex Villa', 'location' => 'Purbachal, Dhaka', 'description' => 'A family duplex with generous garden terraces on both levels. Biophilic design principles bring nature into every room through living walls and natural materials.', 'is_featured' => false],
            ['title' => 'Penthouse Duplex Suite', 'location' => 'Gulshan 2, Dhaka', 'description' => 'An ultra-luxury penthouse duplex occupying the top two floors of a premium tower. Private rooftop pool, home cinema, and bespoke interiors define this exceptional residence.', 'is_featured' => false],
            ['title' => 'Compact Duplex Apartment', 'location' => 'Mohammadpur, Dhaka', 'description' => 'A cleverly designed compact duplex that maximizes every square foot. Innovative storage solutions, multi-functional furniture, and smart spatial planning create a surprisingly spacious home.', 'is_featured' => false],
        ],
        'Architecture' => [
            ['title' => 'Mixed-Use Development', 'location' => 'Tejgaon, Dhaka', 'description' => 'A landmark mixed-use tower combining retail, office, and residential uses. The sculptural facade responds to solar orientation while creating a distinctive addition to the skyline.', 'is_featured' => true],
            ['title' => 'Cultural Centre Design', 'location' => 'Savar, Dhaka', 'description' => 'A community cultural centre celebrating local arts and heritage. Flexible performance spaces, galleries, and workshops are organized around a central courtyard.', 'is_featured' => false],
            ['title' => 'Educational Campus', 'location' => 'Gazipur', 'description' => 'A comprehensive educational campus designed to inspire learning. Flexible classroom configurations, collaborative outdoor spaces, and sustainable design strategies.', 'is_featured' => false],
            ['title' => 'Healthcare Facility', 'location' => 'Narayanganj', 'description' => 'A patient-centred healthcare facility prioritizing natural light, wayfinding clarity, and calming environments. Evidence-based design principles guide every decision.', 'is_featured' => false],
            ['title' => 'Residential Tower', 'location' => 'Chittagong', 'description' => 'A 28-storey residential tower with a distinctive stepped profile creating generous sky gardens at every third floor. The design maximizes views and natural ventilation.', 'is_featured' => false],
        ],
        'Construction' => [
            ['title' => 'Industrial Warehouse Complex', 'location' => 'Ashulia, Dhaka', 'description' => 'A state-of-the-art industrial complex with 50,000 sqft of warehouse space. Optimized logistics flow, loading bays, and office facilities meet the demands of modern distribution.', 'is_featured' => true],
            ['title' => 'Bridge Infrastructure Project', 'location' => 'Keraniganj, Dhaka', 'description' => 'A critical infrastructure project connecting two communities. Structural engineering excellence and durable materials ensure a lifespan exceeding 100 years.', 'is_featured' => false],
            ['title' => 'Commercial Complex Build', 'location' => 'Narayanganj', 'description' => 'Ground-up construction of a 15-storey commercial complex. Advanced construction management, quality control systems, and on-time delivery define this successful project.', 'is_featured' => false],
            ['title' => 'Residential Township', 'location' => 'Purbachal New Town', 'description' => 'A master-planned residential township for 500 families. Infrastructure, utilities, community facilities, and landscaping delivered as an integrated development.', 'is_featured' => false],
            ['title' => 'Factory Fit-Out', 'location' => 'Tongi, Gazipur', 'description' => 'Complete fit-out of a modern manufacturing facility. Specialized flooring, industrial HVAC, electrical systems, and safety infrastructure meet international production standards.', 'is_featured' => false],
        ],
    ];

    public function run(): void
    {
        $order = Project::max('order') ?? 0;

        foreach ($this->projects as $category => $items) {
            $imageUrls = $this->images[$category];

            foreach ($items as $index => $item) {
                $order++;
                $imageUrl = $this->downloadImage($imageUrls[$index], $category, $index);

                Project::create([
                    'title'       => $item['title'],
                    'category'    => $category,
                    'location'    => $item['location'],
                    'description' => $item['description'],
                    'image_url'   => $imageUrl,
                    'gallery'     => [],
                    'amenities'   => [],
                    'floor_plans' => [],
                    'order'       => $order,
                    'is_featured' => $item['is_featured'],
                    'is_active'   => true,
                ]);

                $this->command->info("Created: {$item['title']}");
            }
        }
    }

    private function downloadImage(string $url, string $category, int $index): string
    {
        $slug = Str::slug($category);
        $filename = "projects/{$slug}-" . ($index + 1) . '-' . Str::random(8) . '.jpg';

        try {
            $context = stream_context_create([
                'http' => [
                    'timeout' => 30,
                    'user_agent' => 'Mozilla/5.0 (compatible; ProjectSeeder/1.0)',
                ],
                'ssl' => [
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                ],
            ]);

            $imageData = file_get_contents($url, false, $context);

            if ($imageData === false) {
                throw new \Exception("Failed to download image");
            }

            Storage::disk('public')->put($filename, $imageData);
            return Storage::disk('public')->url($filename);
        } catch (\Exception $e) {
            $this->command->warn("Could not download image for {$category} #{$index}: {$e->getMessage()}");
            // Return a placeholder that will be served from Unsplash directly
            return $url;
        }
    }
}
