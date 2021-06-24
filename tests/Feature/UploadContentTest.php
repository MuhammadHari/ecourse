<?php

namespace Tests\Feature;

use App\Constants\AppRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class UploadContentTest extends TestCase
{
  public function testUploadContent()
  {
    $user = User::whereRole(AppRole::Adm)->first();
    $mutateOp = [
      "operationName"=>"uploadContent",
      "query"=>'mutation uploadContent(
            $sectionId: String!,
            $classroomId: String!,
             $title: String!,
              $description: String!,
               $content: Upload!
               ) { content(section_id: $sectionId, classroom_id: $classroomId, title: $title, description: $description, content: $content)
            {
                id
                title
            }}',
      'variables'=>[
        "sectionId"=>"1",
        "classroomId"=>"1",
        "title"=>"testing",
        "description"=>"testing",
        "content"=>null
      ]
    ];
    $content = \Storage::get('assets/videos/test.pdf');
    $map = [
      "0"=>["variables.content"]
    ];
    $file = [
      "0"=> UploadedFile::fake()->createWithContent('file.pdf', $content),
    ];
    $request = $this->actingAs($user)->multipartGraphQL($mutateOp,$map, $file);
    $request->assertSuccessful();
    $testCase = $request->json("data.content.title");
    $this->assertSame(
      $testCase, "testing"
    );
  }
}
