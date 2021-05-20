<?php

namespace Database\Factories;

use App\Models\Content;
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

  public function configure()
  {
    $disk = Storage::disk('dev-only');
    $files = $disk->allFiles("/videos");
    return $this->afterCreating(function (Content $content) use ($disk, $files) {
      $file = $this->faker->randomElement($files);
      $type = Str::afterLast($file, '.');
      $name = "content-". $content->id.".$type";
      $content->addContent(UploadedFile::fake()->create($name,$disk->get($file)));
    });
  }
  public function definition()
  {
    return [
      "title"=>$this->faker->course,
      "description"=>Storage::disk()->get("course-desc.json"),
      "sequence_number"=>$this->faker->numberBetween(1,10)
    ];
  }
}
