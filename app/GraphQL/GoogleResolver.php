<?php


namespace App\GraphQL;


use Laravel\Socialite\Two\GoogleProvider;

class GoogleResolver
{
  private GoogleProvider $manager;
  private array $driveScopes = [
    "https://www.googleapis.com/auth/drive.appdata",
    "https://www.googleapis.com/auth/drive"
  ];
  private array $with = [
    "access_type" => "offline",
    "prompt" => "consent select_account",
  ];
  private array $defaultScope = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid"
  ];
  public function __construct()
  {
    $this->manager = \Socialite::driver('google');
  }
  private function withDriveScope(){
    $this->manager = $this->manager->scopes(array_merge($this->defaultScope, $this->driveScopes));
    $this->with = array_merge($this->with, [
      "gdrive"=>true
    ]);
  }
  private function generateRedirectUrl(){
    return $this->manager
      ->with($this->with)
      ->redirect()
      ->getTargetUrl();
  }

  public function getRedirectUrl(){
    return $this->generateRedirectUrl();
  }
  public function getGrantDriveRedirectUrl(){
    $this->withDriveScope();
    return $this->generateRedirectUrl();
  }
}
