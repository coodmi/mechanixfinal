<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamMemberSeeder extends Seeder
{
    public function run(): void
    {
        $members = [
            ['name' => 'John Doe', 'role' => 'CEO', 'image_url' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop', 'linkedin_url' => 'https://linkedin.com/in/johndoe', 'facebook_url' => 'https://facebook.com/johndoe', 'category' => 'Individuals', 'order' => 1],
            ['name' => 'Jane Smith', 'role' => 'CTO', 'image_url' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop', 'linkedin_url' => 'https://linkedin.com/in/janesmith', 'facebook_url' => 'https://facebook.com/janesmith', 'category' => 'Individuals', 'order' => 2],
            ['name' => 'Mike Johnson', 'role' => 'Lead Developer', 'image_url' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop', 'linkedin_url' => 'https://linkedin.com/in/mikejohnson', 'facebook_url' => 'https://facebook.com/mikejohnson', 'category' => 'Individuals', 'order' => 3],
            ['name' => 'Sarah Williams', 'role' => 'Designer', 'image_url' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop', 'linkedin_url' => 'https://linkedin.com/in/sarahwilliams', 'facebook_url' => 'https://facebook.com/sarahwilliams', 'category' => 'Individuals', 'order' => 4],
            ['name' => 'David Brown', 'role' => 'Project Manager', 'image_url' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop', 'linkedin_url' => 'https://linkedin.com/in/davidbrown', 'facebook_url' => 'https://facebook.com/davidbrown', 'category' => 'Individuals', 'order' => 5],
            ['name' => 'Emily Davis', 'role' => 'Marketing', 'image_url' => 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'facebook_url' => 'https://facebook.com/emilydavis', 'category' => 'Individuals', 'order' => 6],
            ['name' => 'Chris Wilson', 'role' => 'Developer', 'image_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop', 'linkedin_url' => 'https://linkedin.com/in/chriswilson', 'facebook_url' => 'https://facebook.com/chriswilson', 'category' => 'Individuals', 'order' => 7],
            ['name' => 'Jessica Taylor', 'role' => 'HR', 'image_url' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww', 'linkedin_url' => 'https://linkedin.com/in/jessicataylor', 'facebook_url' => 'https://facebook.com/jessicataylor', 'category' => 'Individuals', 'order' => 8],
            ['name' => 'Alex Lee', 'role' => 'Data Analyst', 'image_url' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop', 'linkedin_url' => 'https://linkedin.com/in/alexlee', 'facebook_url' => 'https://facebook.com/alexlee', 'category' => 'Individuals', 'order' => 9],
            ['name' => 'Olivia Martinez', 'role' => 'UX Researcher', 'image_url' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop', 'linkedin_url' => 'https://linkedin.com/in/oliviamartinez', 'facebook_url' => 'https://facebook.com/oliviamartinez', 'category' => 'Individuals', 'order' => 10],
            ['name' => 'Ryan Garcia', 'role' => 'DevOps Engineer', 'image_url' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop', 'linkedin_url' => 'https://linkedin.com/in/ryangarcia', 'facebook_url' => 'https://facebook.com/ryangarcia', 'category' => 'Individuals', 'order' => 11],
            ['name' => 'Sophia Patel', 'role' => 'Content Writer', 'image_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop', 'linkedin_url' => 'https://linkedin.com/in/sophiapatel', 'facebook_url' => 'https://facebook.com/sophiapatel', 'category' => 'Individuals', 'order' => 12],
            ['name' => 'Ethan Kim', 'role' => 'QA Tester', 'image_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop', 'linkedin_url' => 'https://linkedin.com/in/ethankim', 'facebook_url' => 'https://facebook.com/ethankim', 'category' => 'Individuals', 'order' => 13],
            ['name' => 'Isabella Nguyen', 'role' => 'Sales Manager', 'image_url' => 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D', 'linkedin_url' => 'https://linkedin.com/in/isabellanguyen', 'facebook_url' => 'https://facebook.com/isabellanguyen', 'category' => 'Individuals', 'order' => 14],
            ['name' => 'Jaiden Sofia', 'role' => 'Animator', 'image_url' => 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D', 'linkedin_url' => 'https://linkedin.com/in/jaidensofia', 'facebook_url' => 'https://facebook.com/jaidensofia', 'category' => 'Individuals', 'order' => 15],
        ];

        foreach ($members as $member) {
            TeamMember::create($member);
        }
    }
}
