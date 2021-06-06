<?php

namespace App\Http\Controllers;

use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ContentStreamController extends Controller
{
  public function show(Request $request, Content $id){
    if ($id->exists){
      $content = $id;
      $media = $content->getFirstMedia("media");
      return Response::download($media->getPath());
    }
  }
}
