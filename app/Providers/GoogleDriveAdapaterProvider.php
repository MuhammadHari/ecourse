<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class GoogleDriveAdapaterProvider  extends \Hypweb\Flysystem\GoogleDrive\GoogleDriveAdapter
{
  public function getService()
  {
    return $this->service;
  }
}
