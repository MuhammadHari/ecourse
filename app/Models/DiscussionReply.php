<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\DiscussionReply
 *
 * @property int $id
 * @property int $discussion_id
 * @property int $user_id
 * @property string $content
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\DiscussionReplyFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply query()
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply whereDiscussionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply whereUserId($value)
 * @mixin \Eloquent
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \Illuminate\Database\Query\Builder|DiscussionReply onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|DiscussionReply whereDeletedAt($value)
 * @method static \Illuminate\Database\Query\Builder|DiscussionReply withTrashed()
 * @method static \Illuminate\Database\Query\Builder|DiscussionReply withoutTrashed()
 */
class DiscussionReply extends Model
{
  use HasFactory, SoftDeletes;

  public function user(){
    return $this->belongsTo(User::class);
  }
}
