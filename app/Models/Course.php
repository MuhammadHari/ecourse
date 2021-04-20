<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * App\Models\Course
 *
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string $caption
 * @property string $category
 * @property int $published
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Course newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Course newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Course query()
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereCaption($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course wherePublished($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereUserId($value)
 * @mixin \Eloquent
 * @property string $description
 * @property-read mixed $image
 * @property-read \Spatie\MediaLibrary\MediaCollections\Models\Collections\MediaCollection|\Spatie\MediaLibrary\MediaCollections\Models\Media[] $media
 * @property-read int|null $media_count
 * @method static \Illuminate\Database\Eloquent\Builder|Course whereDescription($value)
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Section[] $sections
 * @property-read int|null $sections_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Video[] $videos
 * @property-read int|null $videos_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Content[] $contents
 * @property-read int|null $contents_count
 */
class Course extends Model implements HasMedia
{
  use InteractsWithMedia;
  protected $guarded = ['id'];

  public function registerMediaCollections(): void
  {
    $this
      ->addMediaCollection('image')
      ->singleFile();
  }
  public function saveImage($file){
    $this->addMedia($file)->preservingOriginal()->toMediaCollection('image');
  }
// ----------Relation-------------//
  public function sections() : HasMany{
    return $this->hasMany(Section::class);
  }
  public function contents(): HasMany{
    return $this->hasMany(Content::class);
  }
// ----------End Relation---------//



// ----------Attribute------------//
  public function getImageAttribute(){
    return $this->getFirstMediaUrl('image');
  }
// ----------End Attribute----------//

}
