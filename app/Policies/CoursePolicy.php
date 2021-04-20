<?php

namespace App\Policies;

use App\Models\Course;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CoursePolicy
{
  use HandlesAuthorization;

  private function resourceOwner(User $user, Course $course){
    return $user->id === $course->user_id;
  }

  public function update(User $user, Course $course)
  {
    return $this->resourceOwner($user, $course);
  }

  public function delete(User $user, Course $course)
  {
    return $this->resourceOwner($user, $course);
  }
  public function addSection(User $user, Course $course)
  {
    return $this->resourceOwner($user, $course);
  }
  public function addContent(User $user, Course $course){
    return $this->resourceOwner($user, $course);
  }
}
