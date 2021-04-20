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
    });
    Schema::table('discussion_replies', function (Blueprint $table) {
      $relations = [];
      $relations[] = $table->foreign("discussion_id")->on("discussions");
      $relations[] = $table->foreign("user_id")->on('users');
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
    Schema::dropIfExists('discussion_replies');
  }
}
