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
      $table->unsignedBigInteger("classroom_id");
      $table->unsignedBigInteger("user_id");
      $table->unsignedBigInteger("section_id")->nullable();
      $table->string("title");
      $table->text("description");
      $table->unsignedBigInteger('sequence_number')->default(0);
      $table->enum('type', ["video","pdf"])->default("video");
      $table->timestamps();
    });
    \App\Shared\RelationHelper::AttachRelation("contents", [
      "classroom_id",
      "section_id",
      "user_id"
    ]);
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
