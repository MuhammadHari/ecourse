<?php

namespace Database\Factories;

use App\Models\Classroom;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClassroomFactory extends Factory
{
  protected $model = Classroom::class;
  public function definition()
  {
    return [
      "title"=>$this->faker->course,
      "caption"=>$this->faker->text(50),
      "category"=>$this->faker->randomElement(["math", "computer science", "photography", "art & design"]),
      "description"=>\Storage::get("course-desc.json"),
      "is_publish"=>false
    ];
  }
}
