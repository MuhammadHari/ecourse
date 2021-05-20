<?php

namespace App\Console\Commands;

use App\Constants\AppRole;
use App\Constants\UserGrade;
use App\Models\Classroom;
use App\Models\Content;
use App\Models\Section;
use App\Models\User;
use Database\Factories\SectionFactory;
use Faker\Factory;
use Faker\Generator;
use Illuminate\Console\Command;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Filesystem\FilesystemManager;

class Development extends Command
{
  protected $signature = 'dev';

  protected $description = 'development command';

  private User $adminUser;

  private Generator $faker;

  private FilesystemAdapter $disk;

  public function __construct()
  {
    parent::__construct();
  }
  public function showFillVideo(){
    $this->info("Silahkan isi folder videos dengan video konten terlebih dahulu");
    exit();
  }

  public function makeClassrooms(){
    $this->info("make classroom");
    UserGrade::callback(function ($grade){
      Classroom::factory()->create([
        "grade"=>$grade
      ])->each(function (Classroom $classroom){
        $classroom->addPhoto("https://picsum.photos/1280/720/");
      });
    });

  }

  public function makeSection(){
    $this->info("make section & content");
    $classroms = Classroom::all();
    $teacherids = User::whereRole(AppRole::Teacher)->get()->pluck("id");
    $classroms->each(function (Classroom $classroom) use ($teacherids) {
      $c = $this->faker->numberBetween(3,10);
      for ($i = 0; $i < $c; $i++){
        $section = Section::factory()->create([
          "classroom_id"=>$classroom->id,
          'sequence'=>$i + 1
        ]);
        Content::factory()->count($this->faker->numberBetween(3,10))->create([
          "section_id"=>$section->id,
          "classroom_id"=>$classroom->id,
          "user_id"=>$this->faker->randomElement($teacherids->toArray()),
        ])->each(function (Content $content, int $index){
          $content->sequence_number = $index + 1;
          $content->save();
        });
      }
    });
  }

  private function checkDeps(){
    $this->faker = Factory::create();

    $assetDisk = \Storage::disk("dev-only");
    if (! $assetDisk->has("/videos")){
      $assetDisk->createDir("/videos");
      $this->showFillVideo();
    }
    if (! count($assetDisk->allFiles("/videos"))){
      $this->showFillVideo();
    }
    $this->disk = $assetDisk;
  }

  public function handle()
  {
    $this->info("check deps");
    $this->checkDeps();
//    \Artisan::call("migrate:fresh");
//    $this->adminUser = User::factory()->create([
//      "email"=>env("ADMIN_EMAIL", "teacher@laravel.com"),
//      "role"=>"Admin",
//      "grade"=>null
//    ]);
//    $this->info("admin created");
//    $this->info("create users");
//    UserGrade::callback(function (string $grade, int $index){
//      User::factory()->create([
//        "role"=>"teacher",
//        "email"=>"teacher".($index+ 1)."@app.com",
//      ]);
//      User::factory()->count($this->faker->numberBetween(20,30))->create([
//        "role"=>"student",
//        "grade"=>$grade
//      ]);
//    });
//    $this->makeClassrooms();
//    $this->makeSection();
    return 1;
  }
}
