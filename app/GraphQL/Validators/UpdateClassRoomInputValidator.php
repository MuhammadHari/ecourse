<?php


namespace App\GraphQL\Validators;


class UpdateClassRoomInputValidator extends CreateClassRoomInputValidator
{
  public function rules(): array
  {
    return $this->makeRule(false);
  }
}
