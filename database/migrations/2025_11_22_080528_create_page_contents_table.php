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
        Schema::create('page_contents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('section_id')->constrained('page_sections')->onDelete('cascade');
            $table->string('key'); // e.g., 'title', 'subtitle', 'description', 'image_url'
            $table->text('value')->nullable();
            $table->string('type')->default('text'); // text, image, json, number
            $table->timestamps();
            
            $table->unique(['section_id', 'key']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('page_contents');
    }
};
