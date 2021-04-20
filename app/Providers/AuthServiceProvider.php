<?php

namespace App\Providers;

use App\Models\Course;
use App\Models\Section;
use App\Policies\CoursePolicy;
use App\Policies\SectionPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
  /**
   * The policy mappings for the application.
   *
   * @var array
   */
  protected $policies = [
    Course::class => CoursePolicy::class,
    Section::class=>SectionPolicy::class
  ];

  /**
   * Register any authentication / authorization services.
   *
   * @return void
   */
  public function boot()
  {
    $this->registerPolicies();

    //
  }
}
