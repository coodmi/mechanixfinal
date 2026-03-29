<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('admin_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('action'); // created, updated, deleted
            $table->string('model'); // NavigationItem, Service, Project, etc.
            $table->string('model_id')->nullable();
            $table->json('changes')->nullable(); // Store what changed
            $table->string('description')->nullable();
            $table->timestamps();
            
            $table->index(['created_at']);
            $table->index(['model', 'action']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_activities');
    }
};
