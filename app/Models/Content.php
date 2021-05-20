<?php

namespace App\Models;

use Eloquence\Behaviours\CamelCasing;
use GuzzleHttp\Psr7\UploadedFile;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Testing\File;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\FileAdder;

/**
 * App\Models\Content
 *
 * @property int $id
 * @property int $classroom_id
 * @property int|null $section_id
 * @property string $title
 * @property string $description
 * @property int $sequence_number
 * @property string $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Classroom $classroom
 * @property-read \Spatie\MediaLibrary\MediaCollections\Models\Collections\MediaCollection|\Spatie\MediaLibrary\MediaCollections\Models\Media[] $media
 * @property-read int|null $media_count
 * @property-read \App\Models\Section|null $section
 * @method static \Database\Factories\ContentFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Content newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Content newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Content query()
 * @method static \Illuminate\Database\Eloquent\Builder|Content whereClassroomId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Content whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Content whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Content whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Content whereSectionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Content whereSequenceNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Content whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Content whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Content whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Content extends Model  implements HasMedia
{
  use HasFactory, CamelCasing, InteractsWithMedia;
  public function registerMediaCollections(): void
  {
    $this->addMediaCollection('media')->singleFile();
  }
  /**
   * @param File|UploadedFile|string $fileOrUrl
   * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileCannotBeAdded
   * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist
   * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig
   */
  public function addContent($fileOrUrl){
    /**
     * @var FileAdder $media
     */
    $media = null;
    if (is_string($fileOrUrl)){
      $media = $this->addMediaFromUrl($fileOrUrl);
    }else{
      $media = $this->addMedia($fileOrUrl);
      $isPdf = Str::contains($fileOrUrl->getClientOriginalName(), "pdf");
      $this->type = $isPdf ? "pdf" : "video";
      $this->save();
    }
    $media->preservingOriginal()->toMediaCollection("media");
  }
  /**
   * @relation
   */
  public function classroom(){
    return $this->belongsTo(Classroom::class);
  }
  public function section(){
    return $this->belongsTo(Section::class);
  }
  public function user(){
    return $this->belongsTo(User::class);
  }
  /**
   * @attribute
   */
  public function getMediaAttribute(){
    return $this->getFirstMediaUrl('media');
  }
}
