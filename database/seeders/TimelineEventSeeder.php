<?php

namespace Database\Seeders;

use App\Models\TimelineEvent;
use Illuminate\Database\Seeder;

class TimelineEventSeeder extends Seeder
{
    public function run(): void
    {
        $events = [
            ['year' => '2011', 'title' => 'Start of Nexkraft Journey', 'description' => '', 'is_current' => false, 'order' => 1],
            ['year' => '2014', 'title' => 'Registration of Nexkraft', 'description' => '', 'is_current' => false, 'order' => 2],
            ['year' => '2018', 'title' => 'International Exposure of Nexkraft', 'description' => '', 'is_current' => false, 'order' => 3],
            ['year' => '2024', 'title' => 'Present Day', 'description' => '', 'is_current' => true, 'order' => 4],
        ];

        foreach ($events as $event) {
            TimelineEvent::create($event);
        }
    }
}
