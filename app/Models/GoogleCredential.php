<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\GoogleCredential
 *
 * @property int $id
 * @property int $user_id
 * @property string $google_id
 * @property string|null $token
 * @property string|null $refresh_token
 * @property string|null $avatar
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCredential newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCredential newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCredential query()
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCredential whereAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCredential whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCredential whereGoogleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCredential whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCredential whereRefreshToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCredential whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCredential whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCredential whereUserId($value)
 * @mixin \Eloquent
 * @property int $drive_scope
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCredential whereDriveScope($value)
 * @property string|null $expire_in
 * @method static \Illuminate\Database\Eloquent\Builder|GoogleCredential whereExpireIn($value)
 */
class GoogleCredential extends Model
{
//    use HasFactory;
  protected $guarded = ["id"];
}
