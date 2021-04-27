<?php

namespace App\Models;

use Eloquence\Behaviours\CamelCasing;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\FileAdder;

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
 */
class Classroom extends Model implements HasMedia
{
  use HasFactory,InteractsWithMedia, CamelCasing;
  protected $guarded = ['id'];

  public function teacher(){
    return $this->belongsTo(User::class, "user_id");
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
    return $this->getFirstMediaUrl("photo");
  }

}
