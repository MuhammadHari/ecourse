<?php

namespace App\Console\Commands;

use App\Models\Classroom;
use App\Models\User;
use Illuminate\Console\Command;

class Development extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'dev';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'development command';

  public function __construct()
  {
    parent::__construct();
  }

  public function makeClassrooms(User $user){
    Classroom::factory()->count(5)->make()->each(function (Classroom $classroom) use ($user){
      $classroom->user_id = $user->id;
      $classroom->save();
    })->each(function (Classroom $classroom){
      $classroom->addPhoto("https://picsum.photos/1280/720/");
      sleep(3);
    });
  }

  public function handle()
  {
    \Artisan::call("migrate:fresh");
    $user = User::factory()->create([
      "email"=>env("ADMIN_EMAIL")
    ]);
    $this->makeClassrooms($user);
    return 1;
  }
}
