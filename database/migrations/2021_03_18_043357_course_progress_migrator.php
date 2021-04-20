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
      $table->unsignedBigInteger('course_id');
      $table->unsignedBigInteger('content_id');
      $table->text('done_list');
      $table->boolean('completed')->default(false);
      $table->timestamps();
    });
    Schema::table('course_progresses', function (Blueprint $table) {
      $relations = [];
      $relations[] = $table->foreign('user_id')->on('users');
      $relations[] = $table->foreign('course_id')->on('courses');
      $relations[] = $table->foreign('content_id')->on('contents');
      foreach ($relations as $relation){
        $relation->references("id");
      }
    });
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
