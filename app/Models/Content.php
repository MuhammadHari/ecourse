<?php

namespace App\Models;

use App\Script\ContentThumbnailGenerator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * App\Models\Content
 *
 * @property int $id
 * @property int $course_id
 * @property int|null $section_id
 * @property string $title
 * @property string $description
 * @property int $sequence_number
 * @property string $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Course $course
 * @property-read mixed $content_url
 * @property-read mixed $thumbnail
 * @property-read \Spatie\MediaLibrary\MediaCollections\Models\Collections\MediaCollection|Media[] $media
 * @property-read int|null $media_count
 * @method static \Illuminate\Database\Eloquent\Builder|Content newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Content newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Content query()
 * @method static \Illuminate\Database\Eloquent\Builder|Content whereCourseId($value)
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
class Content extends Model implements HasMedia
{
  protected $guarded = ['id'];

  use InteractsWithMedia;

  public function course(){
    return $this->belongsTo(Course::class);
  }

  public function registerMediaConversions(Media $media = null): void
  {
    $this->addMediaConversion('thumbnail')
      ->extractVideoFrameAtSecond(5)
      ->pdfPageNumber(1)
      ->performOnCollections('content');
  }

  public function registerMediaCollections(): void
  {
    $this->addMediaCollection("content")
      ->singleFile();
    $this->addMediaCollection("custom_thumbnail")
      ->singleFile();
  }
  public function getImageGenerators() : Collection
  {
    return parent::getImageGenerators()->push(
      ContentThumbnailGenerator::class
    );
  }

  /**
   * @param UploadedFile $file
   * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist
   * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig
   */
  public function addContent($file){
    $this->type = $file->clientExtension() === "pdf" ? "pdf":"video";
    $this->save();
    $this->addMedia($file)
      ->preservingOriginal()
      ->toMediaCollection('content');
  }
  public function addCustomThumbnail($file){
    $this->addMedia($file)
      ->preservingOriginal()
      ->toMediaCollection("custom_thumbnail");
  }


  public function getThumbnailAttribute(){
    $media = $this->getFirstMediaUrl("custom_thumbnail");
    if (! $media){
      return $this->getFirstMedia("content")->getUrl('thumbnail');
    }
    return $media;
  }

  public function getContentUrlAttribute(){
    return $this->getFirstMediaUrl("content");
  }
}
