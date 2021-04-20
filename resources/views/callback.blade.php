<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>{{ config('app.name', 'Laravel') }}</title>
  <link rel="dns-prefetch" href="//fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
  <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>
<h1>Callback page</h1>
</body>
<script>
  window.opener.postMessage(
      {status : true}, window.location.origin
  )
  window.close();
</script>
</html>
