<?php


namespace App\Constants;


class AppRole
{
  const Adm = "Admin";
  const Teacher = "Teacher";
  const Student = "Student";
  const LIST = [
    self::Adm, self::Teacher, self::Student
  ];
}
