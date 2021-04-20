<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class VideoMigrator extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('contents', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger("course_id");
      $table->unsignedBigInteger("section_id")->nullable();
      $table->string("title");
      $table->string("description");
      $table->unsignedBigInteger('sequence_number')->default(0);
      $table->enum('type', ["video","pdf"])->default("pdf");
      $table->timestamps();
    });
    Schema::table('contents', function (Blueprint $table) {
      $table->foreign("course_id")->on("courses")->references("id");
      $table->foreign("section_id")->on("sections")->references("id");
    });
  }
  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('videos');
  }
}
