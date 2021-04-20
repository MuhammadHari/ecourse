<?php


namespace App\Interfaces;


use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class MasterPolicy
{
  protected function resourceOwner(User $user, Model $model, string $modelKey = "user_id"){
    return $user->id === $model->$modelKey;
  }
}
