@component('mail::message')
{{$user->name}} if you did not request resetting your account password, please did not tell anyone of this password token code
<p style="font-weight: bolder; text-align: center">{{$code}}</p>
<p style="text-align: center">Code above will expire in 10 minutes</p>
@component('mail::button', ['url' => env("APP_URL") . "auth?email=". $user->email ."&code=".$code])
Click here to change your password
@endcomponent

@endcomponent
