<?php


namespace App\GraphQL;


use App\Models\Classroom;
use App\Shared\GraphqlResolver;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ClassRoomResolver
 * @package App\GraphQL
 * @property Classroom $model
 */
class ClassRoomResolver extends GraphqlResolver
{
  public function getExcluded(array $array): array
  {
    return ["photo"];
  }

  public function makeModel(): Model
  {
    return Classroom::create($this->modelArguments);
  }

  protected function afterCreate()
  {
    $this
      ->model
      ->addPhoto($this->additionalArguments['photo']);
  }

  public function getTeacherClassroom($builder){
    $id = auth()->id();
    return $builder->whereUserId($id)->orderByDesc("created_at");
  }
}
