<?php


namespace App\GraphQL;


use Nuwave\Lighthouse\Exceptions\AuthenticationException;

class AuthResolver
{
  public function login($_, array $args){
    $guard = auth()->guard();
    $user = $guard->attempt(\Arr::except($args, ['directive']));
    if ($user){
      return true;
    }
    throw new AuthenticationException("Incorrect email or password");
  }
  public function register($_, array $args){

  }
}
