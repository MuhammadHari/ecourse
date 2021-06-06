<?php


namespace App\Script;


use Illuminate\Support\Str;

class MediaUrlHelper
{
  public static function parseUrl(string $url) : string{
//    $url = Str::replaceFirst(env("APP_URL"), '', $url);
//    return Str::replaceFirst(("http://localhost:8000"), '', $url);
    return $url;
  }
}
