<?php

namespace App\Http\Controllers;

use App\Models\BookFlight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            "bookedflights" => BookFlight::all(),
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

        // 1. Create role via webhook
        try {
            $response = Http::post($webhookUrl, [
                Auth::id(),
                

            ]);

            if (!$response->successful()) {
                return back()->withErrors(['webhook' => 'Role creation webhook failed.']);
            }

            $roleId = $responseRole->json('id'); // <-- extract role ID
            
        } catch (\Exception $e) {
            return back()->withErrors(['webhook' => 'Could not reach role creation webhook.']);
        }

        // 2. Sync permissions using second webhook
        try {
            $responsePermission = Http::post($webhookUrlSyncPermission, [
                'role_id' => $roleId,
                'permission_ids' => $request->permissions, // <-- send array
            ]);

            if (!$responsePermission->successful()) {
                return back()->withErrors(['webhook' => 'Permission sync webhook failed.']);
            }
        } catch (\Exception $e) {
            return back()->withErrors(['webhook' => 'Could not reach permission sync webhook.']);
        }

        return redirect()->route('roles.index');
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
