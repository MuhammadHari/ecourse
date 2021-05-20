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
    if (isset($this->modelArguments['id'])){
      return Classroom::find($this->modelArguments['id']);
    }
    return Classroom::create($this->modelArguments);
  }

  protected function afterCreate()
  {
    $this
      ->model
      ->addPhoto($this->additionalArguments['photo']);
  }
  protected function afterUpdate()
  {
    if (isset($this->additionalArguments['photo'])){
      $this->afterCreate();
    }
  }

  public function getTeacherClassroom($builder){
    $id = auth()->id();
    return $builder->whereUserId($id)->orderByDesc("created_at");
  }
}
