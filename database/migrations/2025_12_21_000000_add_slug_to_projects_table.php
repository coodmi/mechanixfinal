<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('slug')->unique()->nullable()->after('title');
        });

        // Generate slugs for existing projects
        $projects = \App\Models\Project::all();
        foreach ($projects as $project) {
            $baseSlug = Str::slug($project->title);
            $slug = $baseSlug;
            $counter = 1;
            
            // Ensure unique slug
            while (\App\Models\Project::where('slug', $slug)->where('id', '!=', $project->id)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }
            
            $project->slug = $slug;
            $project->save();
        }

        // Make slug required after populating existing records
        Schema::table('projects', function (Blueprint $table) {
            $table->string('slug')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
