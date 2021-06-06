<?php

namespace App\Models;

use App\Script\ContentMetaData;
use App\Script\MediaUrlHelper;
use Eloquence\Behaviours\CamelCasing;
use GuzzleHttp\Psr7\UploadedFile;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Testing\File;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\FileAdder;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

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
 * @property int $user_id
 * @property-read mixed $media_content
 * @property-read mixed $thumbnail
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Content whereUserId($value)
 * @property mixed $meta_data
 * @method static \Illuminate\Database\Eloquent\Builder|Content whereMetaData($value)
 * @property-read mixed $duration
 * @property-read mixed $page_number
 */
class Content extends Model  implements HasMedia
{
  use HasFactory, CamelCasing, InteractsWithMedia;

  protected $guarded = ["id"];

  public $registerMediaConversionsUsingModelInstance = true;
  public function registerMediaConversions(Media $media = null): void
  {
    if ($this->type === "pdf"){
      $this->addMediaConversion('thumbnail')
        ->pdfPageNumber(1)
        ->performOnCollections('media');
    }else{
      $this->addMediaConversion('thumbnail')
        ->extractVideoFrameAtSecond(3)
        ->performOnCollections('media');
    }
  }

  public function user(){
    return $this->belongsTo(User::class);
  }

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
  /**
   * @attribute
   */
  public function getMediaContentAttribute(){
    return route("stream", ['id'=>$this->id]);
  }
  public function getThumbnailAttribute(){
    return MediaUrlHelper::parseUrl($this->getFirstMediaUrl('media', "thumbnail"));
  }
  public function getPageNumberAttribute(){
    return ContentMetaData::getValue($this, "pageTotal", 0);
  }
  public function getDurationAttribute(){
    return ContentMetaData::getValue($this, "duration", 0);
  }
}
