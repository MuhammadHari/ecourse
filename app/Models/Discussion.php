<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Discussion
 *
 * @property int $id
 * @property int $user_id
 * @property int|null $course_id
 * @property int|null $video_id
 * @property string $content
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion query()
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereVideoId($value)
 * @mixin \Eloquent
 * @property int|null $content_id
 * @method static \Illuminate\Database\Eloquent\Builder|Discussion whereContentId($value)
 */
class Discussion extends Model
{
//    use HasFactory;
}
