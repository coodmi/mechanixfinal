<?php

namespace Database\Seeders;

use App\Models\AdminActivity;
use App\Models\User;
use App\Models\Service;
use App\Models\Project;
use App\Models\NavigationItem;
use App\Models\PageSection;
use App\Models\PageContent;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class AdminActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();
        
        if (!$user) {
            $this->command->warn('No users found. Please run the DatabaseSeeder first.');
            return;
        }

        // Clear existing activities
        AdminActivity::truncate();

        // Get existing models for realistic references
        $services = Service::all();
        $projects = Project::all();
        $navigationItems = NavigationItem::all();
        $pageSections = PageSection::all();
        $pageContents = PageContent::all();

        $now = Carbon::now();
        $activities = [];

        // Generate activities over the last 90 days
        for ($daysAgo = 89; $daysAgo >= 0; $daysAgo--) {
            $date = $now->copy()->subDays($daysAgo);
            
            // Random number of activities per day (0-8)
            $activitiesPerDay = rand(0, 8);
            
            for ($i = 0; $i < $activitiesPerDay; $i++) {
                $activityTime = $date->copy()->addHours(rand(8, 18))->addMinutes(rand(0, 59));
                
                // Randomly pick an action and model
                $action = ['created', 'updated', 'deleted'][rand(0, 2)];
                $modelTypes = [
                    ['model' => 'Service', 'items' => $services, 'label' => 'service'],
                    ['model' => 'Project', 'items' => $projects, 'label' => 'project'],
                    ['model' => 'NavigationItem', 'items' => $navigationItems, 'label' => 'navigation item'],
                    ['model' => 'PageSection', 'items' => $pageSections, 'label' => 'page section'],
                    ['model' => 'PageContent', 'items' => $pageContents, 'label' => 'page content'],
                ];
                
                $modelType = $modelTypes[array_rand($modelTypes)];
                $model = $modelType['model'];
                $items = $modelType['items'];
                $label = $modelType['label'];
                
                // Get a random item from the collection if available
                $modelId = $items->isNotEmpty() ? $items->random()->id : null;
                $itemName = $items->isNotEmpty() ? ($items->find($modelId)->title ?? $items->find($modelId)->name ?? $label) : $label;
                
                // Create description based on action
                $description = match($action) {
                    'created' => "Created new {$label}: {$itemName}",
                    'updated' => "Updated {$label}: {$itemName}",
                    'deleted' => "Deleted {$label}: {$itemName}",
                };
                
                // Generate realistic changes data
                $changes = match($action) {
                    'created' => [
                        'new' => [
                            'title' => $itemName,
                            'status' => 'active',
                        ]
                    ],
                    'updated' => [
                        'old' => ['status' => 'draft'],
                        'new' => ['status' => 'active'],
                    ],
                    'deleted' => [
                        'old' => [
                            'title' => $itemName,
                        ]
                    ],
                };
                
                $activities[] = [
                    'user_id' => $user->id,
                    'action' => $action,
                    'model' => $model,
                    'model_id' => $modelId,
                    'changes' => json_encode($changes),
                    'description' => $description,
                    'created_at' => $activityTime,
                    'updated_at' => $activityTime,
                ];
            }
        }

        // Insert all activities in chunks for better performance
        foreach (array_chunk($activities, 100) as $chunk) {
            AdminActivity::insert($chunk);
        }

        $this->command->info('Created ' . count($activities) . ' admin activity records over the last 90 days.');
    }
}
