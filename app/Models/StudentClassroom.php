<?php

namespace App\Models;

use Eloquence\Behaviours\CamelCasing;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Collection\Collection;
use function React\Promise\reduce;

/**
 * App\Models\StudentClassroom
 *
 * @property int $id
 * @property int $classroom_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Classroom $classroom
 * @property-read \Illuminate\Support\Collection $section_progress
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClassroom newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClassroom newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClassroom query()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClassroom whereClassroomId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClassroom whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClassroom whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClassroom whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentClassroom whereUserId($value)
 * @mixin \Eloquent
 */
class StudentClassroom extends Model
{

  protected $guarded = ['id'];

  use CamelCasing;

  public function classroom(){
    return $this->belongsTo(Classroom::class);
  }
  public function user(){
    return $this->belongsTo(User::class);
  }

  private function makeProgress(Section $section, Content $content){
    return Progress::create([
      "section_id"=>$section->id,
      "content_id"=>$content->id,
      "user_id"=>$this->user_id
    ]);
  }

  public function getSectionProgressAttribute(){
    $sections = $this->classroom->sections;
    $progresses = collect();
    foreach ($sections as $section){
      foreach ($section->contents as $content){
       $find = Progress::whereContentId($content->id)->whereUserId($this->user_id);
       if (! $find->count()){
         $this->makeProgress($section, $content);
       }
      }
      $base = Progress::whereSectionId($section->id)->whereUserId($this->user_id);
      $baseC = $base->count();
      $completed = $base->whereCompleted(true);
      $completedC = $completed->count();
      $progresses = $progresses->push([
        "section_id"=>$section->id,
        "progress"=>$completedC ?( $completed->count() / $baseC ) * 100 : 0
      ]);
    }
    return $progresses->toArray();
  }
}
