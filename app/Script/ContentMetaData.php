<?php


namespace App\Script;


use App\Models\Content;
use FFMpeg\FFMpeg;
use FFMpeg\FFProbe;
use Google\Model;
use GuzzleHttp\Psr7\UploadedFile;
use Imagick;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ContentMetaData
{
  public function getPdfPages(string $path){
    $image = new Imagick();
    $image->pingImage($path);
    return $image->getNumberImages();
  }

  private function getFfmpeg(string $path){
    return FFMpeg::create(array(
      'ffmpeg.binaries' => config('media-library.ffmpeg_path'),
      'ffprobe.binaries' => config('media-library.ffprobe_path'),
    ))
      ->open($path)
      ->getFFProbe();
  }

  public function getVideoDuration(string $path){
   return  $this->getFfmpeg($path)->format($path)->get('duration');
  }

  public function parse(string $filepath){
    $exploded = explode(".", $filepath);
    $ext = array_pop($exploded);
    $isPdf = $ext === "pdf";
    if ($isPdf){
      return [
        "pageTotal"=>$this->getPdfPages($filepath)
      ];
    }
    try {
      return [
        "duration"=>$this->getVideoDuration($filepath)
      ];
    }catch (\Exception $exception){
      return [
        "duration"=>$this->getVideoDuration($filepath)
      ];
    }
  }

  public static function make(Media $media){
    $self = new self();
    return $self->parse($media->getPath());
  }

  public static function getValue(Content $content, string $key, $defaultValue){
    $meta = json_decode($content->meta_data, true);
    return $meta[$key] ?? $defaultValue;
  }

}
