<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ClassRoomMigrator extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('classrooms', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('user_id');
      $table->string("title");
      $table->text("caption");
      $table->string("category");
      $table->text('description');
      $table->boolean("is_publish")->default(false);
      $table->timestamps();
    });
    \App\Shared\RelationHelper::AttachRelation("classrooms", ["user_id"]);
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
