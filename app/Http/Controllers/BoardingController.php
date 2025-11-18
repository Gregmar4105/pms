<?php

namespace App\Http\Controllers;

use App\Models\Boarding;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BoardingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Boarding/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Boarding $boarding)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Boarding $boarding)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Boarding $boarding)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Boarding $boarding)
    {
        //
    }
}
