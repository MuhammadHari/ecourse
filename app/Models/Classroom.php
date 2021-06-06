<?php

namespace App\Models;

use App\Constants\AppRole;
use Eloquence\Behaviours\CamelCasing;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\FileAdder;
use App\Script\MediaUrlHelper;

/**
 * App\Models\Classroom
 *
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string $caption
 * @property string $category
 * @property string $description
 * @property int $published
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Spatie\MediaLibrary\MediaCollections\Models\Collections\MediaCollection|\Spatie\MediaLibrary\MediaCollections\Models\Media[] $media
 * @property-read int|null $media_count
 * @method static \Illuminate\Database\Eloquent\Builder|Classroom newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Classroom newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Classroom query()
 * @method static \Illuminate\Database\Eloquent\Builder|Classroom whereCaption($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Classroom whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Classroom whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Classroom whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Classroom whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Classroom wherePublished($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Classroom whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Classroom whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Classroom whereUserId($value)
 * @mixin \Eloquent
 * @property int $is_publish
 * @method static \Database\Factories\ClassroomFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Classroom whereIsPublish($value)
 * @property-read mixed $photo
 * @property-read mixed $section_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Section[] $sections
 * @property-read int|null $sections_count
 * @property-read \App\Models\User $teacher
 * @property string $grade
 * @method static \Illuminate\Database\Eloquent\Builder|Classroom whereGrade($value)
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Content[] $contents
 * @property-read int|null $contents_count
 * @property-read mixed $content_count
 * @property-read mixed $student_count
 */
class Classroom extends Model implements HasMedia
{
  use HasFactory,InteractsWithMedia, CamelCasing;
  protected $guarded = ['id'];

  public function sections(){
    return $this->hasMany(Section::class)->orderBy("title", "ASC");
  }
  public function contents(){
    return $this->hasMany(Content::class);
  }
  public function students(){
    return User::whereRole(AppRole::Student)->whereGrade($this->grade);
  }

  public function registerMediaCollections(): void
  {
    $this->addMediaCollection('photo')->singleFile();
  }

  public function getPublishedAttribute(){
    return (bool) $this->is_publish;
  }

  public function addPhoto($fileOrUrl){
    /**
     * @var FileAdder $media
     */
    $media = null;
    if (is_string($fileOrUrl)){
      $media = $this->addMediaFromUrl($fileOrUrl);
    }else{
      $media = $this->addMedia($fileOrUrl);
    }
    $media->preservingOriginal()->toMediaCollection("photo");
  }

  public function getPhotoAttribute(){
    return MediaUrlHelper::parseUrl($this->getFirstMediaUrl("photo"));
  }

  public function getStudentCountAttribute(){
    return $this->students()->count();
  }
  public function getSectionCountAttribute(){
    return $this->sections()->count();
  }
  public function getContentCountAttribute(){
    return $this->contents()->count();
  }

}
