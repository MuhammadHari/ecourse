<?php

namespace App\Policies;

use App\Interfaces\MasterPolicy;
use App\Models\Section;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SectionPolicy extends MasterPolicy
{
  use HandlesAuthorization;

  public function update(User $user, Section $section)
  {
    return $this->resourceOwner($user, $section->course);
  }

  public function delete(User $user, Section $section)
  {
    return $this->resourceOwner($user, $section->course) &&
      ! $section->videos_count;
  }
}
