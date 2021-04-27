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
    Schema::create('course_progresses', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('user_id');
      $table->unsignedBigInteger('classroom_id');
      $table->unsignedBigInteger('content_id');
      $table->text('done_list');
      $table->boolean('completed')->default(false);
      $table->timestamps();
    });
    \App\Shared\RelationHelper::AttachRelation("course_progresses", [
      "user_id", "classroom_id", "content_id"
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
