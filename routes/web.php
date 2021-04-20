<?php

use App\Http\Controllers\GoogleAuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('layouts.app');
});

Route::get("/test", function (){
  Storage::disk('google')->makeDirectory("ecourse");
  dd(Storage::disk("google")->directories());
});

Route::get('/google/callback', [GoogleAuthController::class, 'callback']);
Route::view('/{path?}', 'layouts.app')
  ->where('path', '.*')
  ->name('react');
