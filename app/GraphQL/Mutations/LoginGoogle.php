<?php

namespace App\GraphQL\Mutations;

use Google_Client;
use Laravel\Socialite\Facades\Socialite;

class LoginGoogle
{
  public function getRedirectUrl(): string {
    return Socialite::driver("google")
      ->with(["access_type" => "offline", "prompt" => "consent select_account"])
      ->redirect()->getTargetUrl();
  }

  public function __invoke($_, array $args)
  {
  }
}
