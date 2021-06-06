<?php


namespace App\GraphQL;


use App\Models\Content;
use App\Models\Progress;

class ProgressResolver
{
  public function find(array $contentId){
    $find = Progress::whereContentId($contentId)->whereUserId(auth()->id());
    if ($find->count()){
      return $find->first();
    }
    $content = Content::find($contentId);
    if ($content)
    return Progress::create([
      "content_id"=>$contentId,
      "section_id"=>$content->section_id,
      "user_id"=>auth()->id()
    ]);
    return null;
  }
}
