<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SectionMigrator extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('sections', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger("classroom_id");
      $table->string("title");
      $table->text("description");
      $table->timestamps();
    });
    \App\Shared\RelationHelper::AttachRelation("sections", ["classroom_id"]);
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('sections');
  }
}
