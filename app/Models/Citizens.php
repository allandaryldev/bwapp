<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Citizens extends Model
{
    use HasFactory;

    protected $fillable = [
      "name",
      "gender",
      "age",
      "mobile_no",
      "body_temp",
      "diagnosed",
      "encountered",
      "vacinated",
      "nationality"
    ];
}
