<?php

namespace App\GraphQL\Validators;

use Illuminate\Validation\Rule;
use Nuwave\Lighthouse\Validation\Validator;

class UpdateContentInputValidator extends Validator
{
  private function thumbPositionRule(){
    return function (){
      return $this->arg('video') !== null;
    };
  }
  public function rules(): array
  {
    return [
      'title'=>  ["sometimes"],
      'description' => ["sometimes"],
      'content'=>["mimetypes:video/*,application/pdf"],
      'thumb_position'=>[Rule::requiredIf($this->thumbPositionRule()), 'numeric', 'min:0']
    ];
  }
}
