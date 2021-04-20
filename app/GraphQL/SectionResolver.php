<?php


namespace App\GraphQL;


use App\Interfaces\CourseManagement;
use App\Models\Section;
use Illuminate\Support\Arr;

class SectionResolver extends CourseManagement
{

  protected string $inputIdentifier = "course_id";

  public function create($_, array $args){
    $course = $this->getCourseFromArgs($args);
    $input = Arr::except($args, ['course_id', 'directive']);
    $section = new Section($input);
    $course->sections()->save($section);
    $section->refresh();
    return $section;
  }
}
