<?php


namespace App\GraphQL;


use App\Interfaces\CourseManagement;
use App\Models\Content;
use App\Models\Video;
use Illuminate\Support\Arr;

class ContentResolver extends CourseManagement
{
  private $except = [
    "directive",
    "content",
    "course_id",
    'custom_thumbnail'
  ];
  protected string $inputIdentifier = "course_id";

  private function getContentFromArgs(array $args){
    if (isset($args["id"])){
      return Content::find($args["id"]);
    }
    $attributes = Arr::except($args, $this->except);
    return new Content($attributes);
  }
  private function setContent(Content $content, array $args){
    if (isset($args["content"])){
      $content->addContent($args["content"]);
    }
  }
  private function setThumbnail(Content $content, array $args){
    if (isset($args["custom_thumbnail"])){
      $content->addCustomThumbnail($args["custom_thumbnail"]);
    }
  }

  public function create($_, array $args){
    $content = $this->getContentFromArgs($args);
    $course = $this->getCourseFromArgs($args);
    $course->contents()->save($content);
    $this->setThumbnail($content, $args);
    $content->refresh();
    $this->setContent($content, $args);
    return $content;
  }
  public function update($_, array $args){
    $content = $this->getContentFromArgs($args);
    $attributes = Arr::except($args, $this->except);
    $content->update($attributes);
    $this->setThumbnail($content, $args);
    $this->setContent($content, $args);
    $content->refresh();
    return $content;
  }
}
