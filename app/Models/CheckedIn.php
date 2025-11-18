<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CheckedIn extends Model
{
    protected $table = 'checked-in';

    protected $fillable = [
        'user_id',
        'flight_number',
        'passenger_status',
        'airline_code',
        'aircraft_code',
        'origin_code',
        'destination_code',
        'gate_code',
        'baggage_code',
    ];
}
