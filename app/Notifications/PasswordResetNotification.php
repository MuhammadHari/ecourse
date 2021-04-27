<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PasswordResetNotification extends Notification
{
  use Queueable;

  private string $code;
  private User $user;

  public function __construct(User $user, string $tokenCode)
  {
    $this->user= $user;
    $this->code= $tokenCode;
  }

  public function via($notifiable)
  {
    return ['mail'];
  }

  public function toMail($notifiable)
  {
    return (new MailMessage)->markdown('mail.password_reset', [
      "code"=>$this->code,
      "user"=>$this->user,
    ]);
  }
  public function toArray($notifiable)
  {
    return [];
  }
}
