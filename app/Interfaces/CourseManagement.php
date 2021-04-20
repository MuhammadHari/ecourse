<?php


namespace App\Interfaces;


use App\Models\Course;
use Illuminate\Support\Arr;

class CourseManagement
{
  protected string $inputIdentifier = "id";

  protected function getCourseFromArgs(array $args){
    $data = Arr::except($args, ['directive', 'image']);
    if (isset($args[$this->inputIdentifier])){
      return Course::find($args[$this->inputIdentifier]);
    }
    return Course::create($data);
  }
}
