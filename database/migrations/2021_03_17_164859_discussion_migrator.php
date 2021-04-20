<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DiscussionMigrator extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('discussions', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('user_id');
      $table->unsignedBigInteger('course_id')->nullable();
      $table->unsignedBigInteger('content_id')->nullable();
      $table->text('content');
      $table->timestamps();
    });
    Schema::table('discussions', function (Blueprint $table) {
      $relations = [];
      $relations[]= $table->foreign('user_id')->on("users");
      $relations[]= $table->foreign('course_id')->on("courses");
      $relations[]= $table->foreign('content_id')->on("contents");
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
    Schema::dropIfExists('discussion');
  }
}
