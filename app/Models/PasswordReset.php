<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PasswordReset
 *
 * @property int $email
 * @property string $token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|PasswordReset newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PasswordReset newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PasswordReset query()
 * @method static \Illuminate\Database\Eloquent\Builder|PasswordReset whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PasswordReset whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PasswordReset whereToken($value)
 * @mixin \Eloquent
 * @property-read mixed $is_expire
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|PasswordReset whereUpdatedAt($value)
 */
class PasswordReset extends Model
{
  protected $primaryKey = "email";
  protected $guarded = [];

  public function getIsExpireAttribute(){
    $now = now();
    return $this->created_at->diffInMinutes($now) > 10;
  }

}
