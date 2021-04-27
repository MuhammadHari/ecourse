<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CommentMigrator extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('comments', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger("user_id");
      $table->unsignedBigInteger("classroom_id")->nullable();
      $table->unsignedBigInteger("content_id")->nullable();
      $table->text('content');
      $table->timestamps();
    });
    $relations = [
      "user_id", "classroom_id", "content_id"
    ];
    \App\Shared\RelationHelper::AttachRelation("comments",$relations);
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('comments');
  }
}
