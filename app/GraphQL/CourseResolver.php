<?php


namespace App\GraphQL;


use App\Interfaces\CourseManagement;
use App\Models\Course;
use Illuminate\Support\Arr;

class CourseResolver extends CourseManagement
{
  public function create($_, array $args): Course {
    $image = $args['image'];
    $course = $this->getCourseFromArgs($args);
    $course->saveImage($image);
    return $course;
  }
  public function update($_, array $args){
    $course = $this->getCourseFromArgs($args);
    $image = $args['image'] ?? null;
    $attributes = Arr::except($args, ['id', 'image', 'directive']);
    if (count($attributes)){
      $course->update($attributes);
    }
    if ($image){
      $course->saveImage($image);
    }
    return $course;
  }
}
