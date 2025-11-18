<?php

namespace App\Http\Controllers;

use App\Models\BookFlight;
use App\Models\CheckedIn;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class BookFlightController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // 1. Fetch data from the external n8n webhook
        $n8n_webhook_url = env('N8N_GET_FLIGHTS_URL'); // 👈 **Replace this with your actual n8n webhook URL**

        try {
            $response = Http::get($n8n_webhook_url);

            // Check if the request was successful (status code 200)
            if ($response->successful()) {
                // Get the JSON data as an array
                $flights_from_n8n = $response->json();
            } else {
                $flights_from_n8n = [];
            }

        } catch (\Exception $e) {
            $flights_from_n8n = [];
        }

        // 2. Return the data to the Inertia view
        return Inertia::render('BookFlight/Index', [
            "bookedflights" => BookFlight::paginate(15),
            // Pass the data fetched from the n8n webhook
            "flights" => $flights_from_n8n,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

     public function store(Request $request)
    {
        $request->validate([
            'request' => 'array',
        ]);

        $webhookUrl = env('N8N_CREATE_FLIGHT_URL');

       
    }

    public function board(Request $request)
    {
        
        $data = $request->input('data');

        $validatedData = validator($data, [
            'user_id' => 'required|integer',
            'flight_number' => 'required|string',
            'passenger_status' => 'required|string',
            'airline_code' => 'required|string',
            'aircraft_icao_code' => 'required|string',
            'origin_code' => 'required|string',
            'destination_code' => 'required|string',
            'gate_code' => 'required|string',
            'baggage_code' => 'nullable|string',
        ])->validate(); 

        DB::beginTransaction(); 

        try {
            
            $checkedIn = CheckedIn::create([
                'user_id' => $validatedData['user_id'],
                'flight_number' => $validatedData['flight_number'],
                'passenger_status' => $validatedData['passenger_status'],
                'airline_code' => $validatedData['airline_code'],
                'aircraft_code' => $validatedData['aircraft_icao_code'],
                'origin_code' => $validatedData['origin_code'],
                'destination_code' => $validatedData['destination_code'],
                'gate_code' => $validatedData['gate_code'],
                'baggage_code' => $validatedData['baggage_code'] ?? null,
                
            ]);

            DB::commit();

            return redirect('/checked-in/index')->with('success', 'Passenger checked in successfully.');

        } catch (\Throwable $e) {

            DB::rollBack(); 

            return redirect()->back()->with('error', 'Failed to check in the passenger due to a server error.');
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(BookFlight $bookFlight)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BookFlight $bookFlight)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BookFlight $bookFlight)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BookFlight $bookFlight)
    {
        //
    }
}
