<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\BookFlightController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\BoardingController;
use App\Http\Controllers\CheckedInController;
use Illuminate\Support\Facades\Http;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth', 'verified' , 'permission:pms_administrator'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');   

    Route::post('/booked-flights/board', [BookFlightController::class, 'board'])
    ->name('booked-flights.board');

    Route::get('/get-flights', function () {
        $n8n_webhook_url = env('N8N_GET_FLIGHTS_URL');

        try {
            $res = Http::get($n8n_webhook_url);
            return $res->json();
        } catch (\Exception $e) {
            return [];
        }
    });

    Route::resource('users' , UserController::class);
    Route::resource('roles' , RoleController::class);
    Route::resource('booked-flights' , BookFlightController::class);
    Route::resource('flights', FlightController::class);
    Route::resource('boarding', BoardingController::class);
    Route::resource('checked-in', CheckedInController::class);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
