<?php

namespace Database\Seeders;

use App\Models\JobOpening;
use Illuminate\Database\Seeder;

class JobOpeningSeeder extends Seeder
{
    public function run(): void
    {
        $jobs = [
            [
                'title' => 'Java Developer',
                'vacancies' => 2,
                'deadline' => '2024-02-03',
                'category' => 'Developer',
                'description' => 'We are looking for an experienced Java Developer to join our team.',
                'order' => 1,
            ],
            [
                'title' => 'PHP Developer',
                'vacancies' => 1,
                'deadline' => '2024-02-15',
                'category' => 'Developer',
                'description' => 'We are looking for a skilled PHP Developer with Laravel experience.',
                'order' => 2,
            ],
            [
                'title' => 'UI/UX Designer',
                'vacancies' => 1,
                'deadline' => '2024-02-20',
                'category' => 'Design',
                'description' => 'Creative UI/UX Designer needed for web and mobile applications.',
                'order' => 3,
            ],
        ];

        foreach ($jobs as $job) {
            JobOpening::create($job);
        }
    }
}
