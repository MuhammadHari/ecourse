<?php

namespace Database\Factories;

use App\Constants\UserGrade;
use App\Models\Classroom;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClassroomFactory extends Factory
{
  protected $model = Classroom::class;
  public function definition()
  {
    return [
      "grade"=>$this->faker->randomElement(UserGrade::list()),
    ];
  }
}
