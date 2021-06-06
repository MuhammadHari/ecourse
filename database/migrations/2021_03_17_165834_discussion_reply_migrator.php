<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DiscussionReplyMigrator extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('discussion_replies', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger("discussion_id");
      $table->unsignedBigInteger("user_id");
      $table->text("content");
      $table->timestamps();
      $table->softDeletes();
    });
    \App\Shared\RelationHelper::AttachRelation("discussion_replies", [
      "discussion_id", "user_id"
    ]);
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('discussion_replies');
  }
}
