<?php

use App\Http\Controllers\GoogleAuthController;
use Illuminate\Support\Facades\Route;


Route::get('/google/callback', [GoogleAuthController::class, 'callback']);
Route::view('/{path?}', 'view')
  ->where('path', '.*')
  ->where('path', '^((?!vendor).)*$')
  ->name('react');
