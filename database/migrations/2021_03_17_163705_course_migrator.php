<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CourseMigrator extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('courses', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('user_id');
      $table->string("title");
      $table->text("caption");
      $table->string("category");
      $table->text('description');
      $table->boolean("published")->default(false);
      $table->timestamps();
    });
    Schema::table('courses', function (Blueprint $table) {
      $table
        ->foreign('user_id')
        ->on("users")
        ->references("id");
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('course');
  }
}
