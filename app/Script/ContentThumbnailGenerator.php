<?php


namespace App\Script;


use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\Conversions\Conversion;
use Spatie\MediaLibrary\Conversions\ImageGenerators\ImageGenerator;
use Spatie\MediaLibrary\Conversions\ImageGenerators\Pdf;
use Spatie\MediaLibrary\Conversions\ImageGenerators\Video;

class ContentThumbnailGenerator extends ImageGenerator
{

  private Video $videoGenerator;
  private Pdf $pdfGenerator;

  public function __construct()
  {
    $this->videoGenerator = new Video();
    $this->pdfGenerator = new Pdf();
  }

  public function convert(string $file, Conversion $conversion = null): string
  {
    $isPdf = Str::afterLast($file,'.') === "pdf";
    if ($isPdf){
      return $this->pdfGenerator->convert($file, $conversion);
    }
    return $this->videoGenerator->convert($file,$conversion);
  }
  public function requirementsAreInstalled(): bool
  {
    return $this->videoGenerator->requirementsAreInstalled() &&
      $this->pdfGenerator->requirementsAreInstalled();
  }

  public function supportedExtensions(): Collection
  {
    return $this->pdfGenerator->supportedExtensions()->merge(
      $this->videoGenerator->supportedExtensions()
    );
  }

  public function supportedMimeTypes(): Collection
  {
    return $this->pdfGenerator->supportedMimeTypes()->merge(
      $this->videoGenerator->supportedMimeTypes()
    );
  }
}
