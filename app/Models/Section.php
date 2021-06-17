<?php

namespace App\Models;

use Eloquence\Behaviours\CamelCasing;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Section
 *
 * @property int $id
 * @property int $classroom_id
 * @property string $title
 * @property int $sequence
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\SectionFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Section newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Section newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Section query()
 * @method static \Illuminate\Database\Eloquent\Builder|Section whereClassroomId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Section whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Section whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Section whereSequence($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Section whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Section whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \App\Models\Classroom $classroom
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Content[] $contents
 * @property-read int|null $contents_count
 * @property-read mixed $content_count
 */
class Section extends Model
{
  use HasFactory, CamelCasing;
  /**
   * @relation
   */
  public function contents(){
    return $this->hasMany(Content::class);
  }
  public function classroom(){
    return $this->belongsTo(Classroom::class);
  }

  public function getContentCountAttribute(){
    return $this->contents()->count();
  }
  public function getPdfCountAttribute(){
    return $this->contents()->whereType("pdf")->count();
  }
  public function getVideoCountAttribute(){
    return $this->contents()->whereType("video")->count();
  }
  public function getProgressAttribute(){
    if (! auth()->check()){
      return 0;
    }
    $uid = auth()->id();

    $total = Progress::whereSectionId($this->id)->whereUserId($uid)->count();

    $completed = Progress::whereSectionId($this->id)
      ->whereCompleted(true)
      ->whereUserId($uid)->count();

    if (!$completed) return 0;

    return (int) (($completed / $total) * 100);
  }
}
