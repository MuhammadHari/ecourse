<?php

namespace App\GraphQL;

use App\Models\Classroom;
use App\Models\StudentClassroom;

class StudentClassroomResolver
{
  public function builder($builder){
    $c = StudentClassroom::whereUserId(auth()->id());
    if (! $c->count()){
      $classroom = Classroom::whereGrade(auth()->user()->grade)->first();
      if ($classroom){
        StudentClassroom::create([
          "classroom_id"=>$classroom->id,
          "user_id"=>auth()->id()
        ]);
      }
    }
    return $c;
  }
}
