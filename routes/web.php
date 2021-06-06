<?php

use App\Http\Controllers\ContentStream;
use App\Http\Controllers\ContentStreamController;
use App\Http\Controllers\GoogleAuthController;
use Illuminate\Support\Facades\Route;


Route::get('/google/callback', [GoogleAuthController::class, 'callback']);

Route::get("/stream/{id}", [ContentStreamController::class, "show"])->name("stream");
Route::view('/{path?}', 'view')
  ->where('path', '.*')
  ->where('path', '^((?!vendor).)*$')
  ->where('path', '^((?!storage).)*$')
  ->where('path', '^((?!stream).)*$')
  ->name('react');
