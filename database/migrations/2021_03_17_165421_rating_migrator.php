<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RatingMigrator extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('ratings', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger("user_id");
      $table->unsignedBigInteger("course_id");
      $table->double('value');
      $table->timestamps();
    });
    Schema::table('ratings', function (Blueprint $table) {
      $relations = [];
      $relations[]=$table->foreign("user_id")->on('users');
      $relations[]=$table->foreign("course_id")->on('courses');
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
    Schema::dropIfExists('ratings');
  }
}
