<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * App\Models\Progress
 *
 * @property int $id
 * @property int $user_id
 * @property int $section_id
 * @property int $content_id
 * @property int $played
 * @property int $completed
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|Progress newModelQuery()
 * @method static Builder|Progress newQuery()
 * @method static Builder|Progress query()
 * @method static Builder|Progress whereCompleted($value)
 * @method static Builder|Progress whereContentId($value)
 * @method static Builder|Progress whereCreatedAt($value)
 * @method static Builder|Progress whereId($value)
 * @method static Builder|Progress wherePlayed($value)
 * @method static Builder|Progress whereSectionId($value)
 * @method static Builder|Progress whereUpdatedAt($value)
 * @method static Builder|Progress whereUserId($value)
 * @mixin Eloquent
 * @property-read Content $content
 * @property-read mixed $status
 */
class Progress extends Model
{
  protected $table = "student_progresses";
  protected $guarded = ["id"];


  public function content(){
    return $this->belongsTo(Content::class);
  }
  public function section(){
    return $this->belongsTo(Section::class);
  }

  public function user(){
    return $this->belongsTo(User::class);
  }

  public function getPageNumberAttribute(){
    $content = $this->content;
    return $content->type === "pdf" ? $content->page_number : 0;
  }
  public function getDurationAttribute(){
    $content = $this->content;
    return $content->type === "video" ? $content->duration : 0;
  }
  public function getContentTypeAttribute(){
    return $this->content->type;
  }

  public function getStatusAttribute(){
    return 0;
  }
}
