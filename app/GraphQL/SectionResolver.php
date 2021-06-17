<?php


namespace App\GraphQL;


use App\Models\Classroom;
use App\Models\Section;
use Illuminate\Support\Arr;

class SectionResolver
{

  function studentSection($builder){
    $grade = auth()->user()->grade;
    $classRoom = Classroom::whereGrade($grade)->first();
    return $builder->whereClassroomId($classRoom->id);
  }

  function updateBatch($_, array $args){
    $items = $args['map'];
    $classroom = Classroom::find($args['classroomId']);
    $ids = Arr::pluck($items, "id");
    if (count($ids) === $classroom->section_count){
      foreach ($ids as $index => $id){
        $find = $classroom->sections()->find($id);
        if ($find){
          $find->sequence = $items[$index]['sequence'];
          $find->save();
        }
      }
    }
    $classroom->refresh();
    return $classroom->sections;
  }

}
