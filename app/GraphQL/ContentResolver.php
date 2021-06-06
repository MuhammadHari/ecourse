<?php


namespace App\GraphQL;
use App\Models\Content;
use App\Script\ContentMetaData;
use App\Shared\GraphqlResolver;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ContentResolver
 * @package App\GraphQL
 * @property Content $model
 */
class ContentResolver extends GraphqlResolver
{

  public function getExcluded(array $array): array
  {
    return ["content"];
  }

  public function makeModel(): Model
  {
    if (isset($this->modelArguments['id'])){
      return Content::find($this->modelArguments['id']);
    }
    $dt = array_merge($this->modelArguments, [
      "meta_data"=>"{}"
    ]);
    return Content::create($dt);
  }

  protected function afterCreate()
  {
    $file = $this->additionalArguments['content'];
    $this->model->addContent($file);
    $this->model->refresh();
    $metadata = ContentMetaData::make($this->model->getFirstMedia("media"));
    $this->model->meta_data = json_encode($metadata);
    $this->model->save();
  }
}
