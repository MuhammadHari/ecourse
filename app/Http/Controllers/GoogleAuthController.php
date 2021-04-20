<?php

namespace App\Http\Controllers;

use App\Models\GoogleCredential;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Testing\Fluent\Concerns\Has;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Contracts\User as GUser;
use Redirect;

class GoogleAuthController extends Controller
{
  private function makeUser(GUser $user) : User {
    return User::create([
      "email"=>$user->getEmail(),
      "password"=>Hash::make(now()->toDateString()),
      "name"=>$user->getName(),
      "google_only"=>true
    ]);
  }

  private function registerGoogleCredential(User $user, GUser $gUser): GoogleCredential {
    if (! $user->googleCredential()->count()){
      $cred = new GoogleCredential([
        "google_id"=>$gUser->getId(),
        "token"=>$gUser->token,
        "refresh_token"=>$gUser->refreshToken,
        "avatar"=>$gUser->getAvatar(),
        "drive_scope"=>false,
        'expire_in'=>$gUser->expiresIn
      ]);
      $user->googleCredential()->save($cred);
      $cred->refresh();
      return $cred;
    }
    $user->googleCredential->update([
      "token"=>$gUser->token,
      "refresh_token"=>$gUser->refreshToken,
      'expire_in'=>$gUser->expiresIn
    ]);
    return $user->googleCredential;
  }

  public function callback(Request $request){
    $gUser = Socialite::driver('google')->user();
    $isExitingUser = User::where([
      "email"=>$gUser->getEmail()
    ])->count();
    $user = $isExitingUser ?
      User::whereEmail($gUser->getEmail())->first() : $this->makeUser($gUser);
    auth()->login($user);
    $credential = $this->registerGoogleCredential($user, $gUser);
    if ( $scopeStr = $request->input("scope")){
      if (Str::contains($scopeStr,"https://www.googleapis.com/auth/drive.appdata")){
        $credential->drive_scope = true;
        $credential->save();
      }
    }
    return view("callback");
  }
}
