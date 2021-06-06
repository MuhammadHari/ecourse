<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentClassroomsTable extends Migration
{
  public function up()
  {
    Schema::create('student_classrooms', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('classroom_id');
      $table->unsignedBigInteger('user_id');
      $table->timestamps();
    });
    \App\Shared\RelationHelper::AttachRelation("student_classrooms", [
      "classroom_id", "user_id"
    ]);
  }
  public function down()
  {
    Schema::dropIfExists('student_classrooms');
  }
}
