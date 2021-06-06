<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CourseProgressMigrator extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('student_progresses', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('user_id');
      $table->unsignedBigInteger('section_id');
      $table->unsignedBigInteger('content_id');
      $table->unsignedBigInteger("played")->default(0);
      $table->boolean('completed')->default(false);
      $table->timestamps();
    });
    \App\Shared\RelationHelper::AttachRelation("student_progresses", [
      "user_id", "section_id", "content_id"
    ]);
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('course_progresses');
  }
}
