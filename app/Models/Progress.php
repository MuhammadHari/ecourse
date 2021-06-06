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

  public function getStatusAttribute(){
    $content = $this->content;
    $n = $content->type === "pdf" ? $content->page_number : $content->duration;
    if (! $n) {
      return 0;
    }
    return round($n / $this->played,1);
  }
}
