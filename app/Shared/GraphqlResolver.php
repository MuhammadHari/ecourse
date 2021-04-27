<?php


namespace App\Shared;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

abstract class GraphqlResolver
{
  protected array $modelArguments = [];
  protected array $additionalArguments = [];
  protected Model $model;

  abstract public function getExcluded(array $array) : array;
  abstract public function makeModel() : Model;

  protected function afterCreate(){

  }

  protected function setArguments(array $arguments){
    $excluded = array_merge($this->getExcluded($arguments), ["directive"]);
    $this->modelArguments = Arr::except($arguments, $excluded);
    $this->additionalArguments = Arr::only($arguments,$this->getExcluded($arguments));
  }

  public function create($_, array $args){
    $this->setArguments($args);
    $this->model = $this->makeModel();
    $this->afterCreate();
    return $this->model;
  }
  public function update($_, array $args){
    $this->setArguments($args);
  }

}
