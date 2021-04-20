<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class GoogleCredentialMigrator extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('google_credentials', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('user_id');
      $table->string('google_id');
      $table->text('token')->nullable();
      $table->text('refresh_token')->nullable();
      $table->text('avatar')->nullable();
      $table->text("expire_in")->nullable();
      $table->boolean('drive_scope')->default(false);
      $table->timestamps();
    });
    Schema::table('google_credentials', function (Blueprint $table) {
      $table->foreign('user_id')->on('users')->references("id");
    });
  }
  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('google_credentials');
  }
}
