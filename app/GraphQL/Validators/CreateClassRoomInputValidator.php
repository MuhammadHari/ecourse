<?php

namespace App\GraphQL\Validators;

use Nuwave\Lighthouse\Validation\Validator;

class CreateClassRoomInputValidator extends Validator
{

  protected function makeRule(bool $isRequired = true){
    $requiredKey = [$isRequired ? "required":"sometimes"];
    return [
      "title"=>[$requiredKey, "string"],
      "caption"=>[$requiredKey, "string"],
      "category"=>[$requiredKey, "string"],
      "description"=>[$requiredKey, "string"],
      "photo"=>[$requiredKey, "file", "image"]
    ];
  }


  public function rules(): array
  {
    return $this->makeRule();
  }
}
