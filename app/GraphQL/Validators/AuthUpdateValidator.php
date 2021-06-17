<?php

namespace App\GraphQL\Validators;

use Nuwave\Lighthouse\Validation\Validator;

class AuthUpdateValidator extends Validator
{

  public function rules(): array
  {
    $user = auth()->id();
    return [
      "name"=>["string"],
      "email"=>["unique:users,email," . $user, "email"],
      "password"=>["confirmed", "string","min:6"],
      "password_confirmation"=>["confirmed", "string","min:6"],
      "avatar"=>["image"]
    ];
  }
}
