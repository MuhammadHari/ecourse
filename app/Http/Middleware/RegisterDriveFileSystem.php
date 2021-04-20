<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Google_Client;
use Google_Service_Drive;
use Hypweb\Flysystem\GoogleDrive\GoogleDriveAdapter;
use Illuminate\Http\Request;
use League\Flysystem\Filesystem;
use Storage;

class RegisterDriveFileSystem
{

  private Request $request;

  private function setClientAccessToken(Google_Client $client){
    if ( $code = $this->request->input("code")){
      $client->fetchAccessTokenWithAuthCode($code);
    }
  }

  private function getOAuthClient( User $user) : Google_Client {
    $gCred = $user->googleCredential;
    $client = new Google_Client();
    $client->setAuthConfig(app_path('credential.json'));
    $client->setAccessToken([
      "expires_in"=>$gCred->expire_in,
      "access_token"=>$gCred->token
    ]);

    if (\request()->input("code")){

    }

    if ($client->isAccessTokenExpired()){
      $tokenInfo = $client->fetchAccessTokenWithRefreshToken($gCred->refresh_token);
      $gCred->token = $tokenInfo["access_token"];
      $gCred->refresh_token = $tokenInfo["refresh_token"];
      $gCred->expire_in = $tokenInfo["expires_in"];
      $gCred->save();
    }
    return $client;
  }
  private function register(User $user){
    if ($user->is_drive_granted){
      Storage::extend('google', function($app, $config) use ($user) {
        $client = $this->getOAuthClient($user);
        $service = new Google_Service_Drive($client);
        $adapter = new GoogleDriveAdapter($service);
        return new Filesystem($adapter);
      });
    }
  }
  /**
   * Handle an incoming request.
   *
   * @param Request $request
   * @param Closure $next
   * @return mixed
   */
  public function handle(Request $request, Closure $next)
  {
    $user = $request->user();
    $this->request = $request;
    if ($user){
      $this->register($user);
    }

    return $next($request);
  }
}
