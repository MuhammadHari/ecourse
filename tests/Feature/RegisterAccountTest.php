<?php

namespace Tests\Feature;

use App\Constants\AppRole;
use App\Constants\UserGrade;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegisterAccountTest extends TestCase
{
  /**
   * A basic feature test example.
   *
   * @return void
   */
  public function testRegisterTeacher()
  {
    $doc = /** @lang GraphQL */'mutation
    user($name: String!,
     $email: String!,
      $password: String!,
       $role: Role,
        $grade: Grade) { user(name: $name, email: $email, password: $password, role: $role, grade: $grade) {
      name,email
      }}';
    $user = User::whereRole(AppRole::Adm)->first();
    $req = $this->actingAs($user)->graphQL($doc, [
      "name"=>"user",
      "email"=>"userteacherTesting@app.com",
      "password"=>"password",
      "role"=>'Teacher',
    ]);
    $req->assertGraphQLValidationPasses();
    $json = $req->json("data.user");
    $this->assertSame($json, [
      "name"=>"user",
      "email"=>'userteacherTesting@app.com'
    ]);
    User::where([
      "name"=>"user",
      "email"=>"userteacherTesting@app.com",
    ])->delete();
  }
  public function testRegisterStudent()
  {
    $doc = /** @lang GraphQL */'mutation
    user($name: String!,
     $email: String!,
      $password: String!,
       $role: Role,
        $grade: Grade) { user(name: $name, email: $email, password: $password, role: $role, grade: $grade) {
      name,email
      }}';
    $user = User::whereRole(AppRole::Adm)->first();
    $req = $this->actingAs($user)->graphQL($doc, [
      "name"=>"user",
      "email"=>"userstudentTesting@app.com",
      "password"=>"password",
      "role"=>'Student',
      "grade"=>"HS1"
    ]);
    $req->assertGraphQLValidationPasses();
    $json = $req->json("data.user");
    $this->assertSame($json, [
      "name"=>"user",
      "email"=>"userstudentTesting@app.com",
    ]);
    User::where([
      "name"=>"user",
      "email"=>"userstudentTesting@app.com",
    ])->delete();
  }
}
