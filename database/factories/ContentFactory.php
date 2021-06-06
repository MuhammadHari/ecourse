<?php

namespace Database\Factories;

use App\Models\Content;
use App\Script\ContentMetaData;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ContentFactory extends Factory
{
  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = Content::class;

  public function getFile(bool $ispdf){

    $disk = Storage::disk('dev-only');
    $files =collect($disk->allFiles("/videos"));
    if ($ispdf){
      return $files->first(function ($path){
        $ext = Str::afterLast($path,".");
        return $ext === "pdf";
      });
    }
    $filter = $files->filter(function ($path){
      $ext = Str::afterLast($path,".");
      return $ext !== "pdf";
    });
    return $this->faker->randomElement($filter->toArray());
  }

  public function configure()
  {
    $disk = Storage::disk('dev-only');
    return $this->afterCreating(function (Content $content) use ($disk) {
      $file = $this->getFile($this->faker->boolean(60));
      $type = Str::afterLast($file, '.');
      $name = "content-". $content->id.".$type";
      $content->addContent(UploadedFile::fake()->create($name,$disk->get(
        $file
      )));
      $content->refresh();
      $metadata = ContentMetaData::make($content->getFirstMedia("media"));
      $content->meta_data = json_encode($metadata);
      $content->save();
    });
  }
  public function definition()
  {
    return [
      "title"=>$this->faker->course,
      "description"=>Storage::disk()->get("course-desc.json"),
      "sequence_number"=>$this->faker->numberBetween(1,10),
      "meta_data"=>"{}"
    ];
  }
}
