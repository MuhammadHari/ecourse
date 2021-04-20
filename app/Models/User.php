<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Sanctum\PersonalAccessToken[] $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property int $google_only
 * @method static \Illuminate\Database\Eloquent\Builder|User whereGoogleOnly($value)
 * @property-read bool $has_connect_google
 * @property-read \App\Models\GoogleCredential|null $googleCredential
 * @property-read bool $is_drive_granted
 */
class User extends Authenticatable
{
  use HasFactory, Notifiable, HasApiTokens;
  protected $fillable = [
    'name',
    'email',
    'password',
  ];
  protected $hidden = [
    'password',
    'remember_token',
  ];
  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  public function googleCredential(){
    return $this->hasOne(GoogleCredential::class);
  }

  public function getHasConnectGoogleAttribute(): bool {
    return (bool) $this->googleCredential()->count();
  }
  public function getIsDriveGrantedAttribute():bool{
    if (! $this->has_connect_google){
      return false;
    }
    return $this->googleCredential->drive_scope;
  }

}
