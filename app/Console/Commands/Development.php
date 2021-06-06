<?php

namespace App\Console\Commands;

use App\Constants\AppRole;
use App\Constants\UserGrade;
use App\Models\Classroom;
use App\Models\Content;
use App\Models\Discussion;
use App\Models\DiscussionReply;
use App\Models\Progress;
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
      $classroom = Classroom::factory()->create([
        "grade"=>$grade
      ]);
      $classroom->addPhoto("https://picsum.photos/1280/720/");
      $this->info("Classroom : ". $classroom->grade. " created");
    });

  }

  public function makeDiscussions(Content $content){
    $students = User::whereRole(AppRole::Student)->whereGrade($content->classroom->grade)->get();
    $students->each(function ($student) use ($content, $students){
      $discussion = Discussion::factory()->create([
        "content_id"=>$content->id,
        "user_id"=>$student->id,
        "created_at"=>$this->faker->dateTimeBetween($content->created_at)
      ]);
      $friends = $students->filter(function ($friend) use ($student){
        return $friend->id !== $student->id;
      });
      $friends->each(function (User $user) use ($discussion){
//        DiscussionReply::factory()->create([
//          "user_id"=>$user->id,
//          "discussion_id"=>$discussion->id,
//          "created_at"=>$this->faker->dateTimeBetween($discussion->created_at)
//        ]);
      });
    });
  }

  public function makeSection(){
    $this->info("make section & content");
    $classroms = Classroom::all();
    $teacherids = User::whereRole(AppRole::Teacher)->get()->pluck("id");
    $classroms->each(function (Classroom $classroom) use ($teacherids) {
//      $c = $this->faker->numberBetween(3,10);
      $c = 5;
      for ($i = 0; $i < $c; $i++){
        $section = Section::factory()->create([
          "classroom_id"=>$classroom->id,
        ]);
        Content::factory()->count(15)->create([
          "classroom_id"=>$classroom->id,
          "section_id"=>$section->id,
          "user_id"=>$this->faker->randomElement($teacherids->toArray()),
          "created_at"=>$this->faker->dateTimeBetween("-3 month", "-1 week")
        ])->each(function (Content $content){
          $this->makeDiscussions($content);
        });
        $this->info("content created");
      }
    });
  }

  public function makeProgress(){
    Section::all()->each(function (Section $section){
      $content = $section->contents->random(1)->first();
      $students = $section->classroom->students()->get();
      $isPdf = $content->type === "pdf";
      $students->each(function (User $user) use ( $content, $section, $isPdf ){
        $play = $this->faker->numberBetween(1, $isPdf ? $content->page_number : $content->duration);
        Progress::create([
          "section_id"=>$section->id,
          "content_id"=>$content->id,
          "user_id"=>$user->id,
          "played"=>$play
        ]);
      });
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
    exec("rm -r ". base_path("storage/app/public/**"));
    $this->checkDeps();
    \Artisan::call("migrate:fresh");
    $this->adminUser = User::factory()->create([
      "email"=>env("ADMIN_EMAIL", "teacher@laravel.com"),
      "role"=>"Admin",
      "grade"=>null
    ]);
    $this->info("admin created");
    $this->info("create users");
    UserGrade::callback(function (string $grade, int $index){
      User::factory()->create([
        "role"=>"teacher",
        "email"=>"teacher".($index+ 1)."@app.com",
      ]);
      User::factory()->count($this->faker->numberBetween(20,30))->create([
        "role"=>"student",
        "grade"=>$grade
      ]);
    });
    $this->makeClassrooms();
    $this->makeSection();
    $this->makeProgress();
    return 0;
  }
}
