<?php

namespace App\Http\Controllers;

use App\Models\CheckedIn;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckedInController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('CheckedIn/Index', [
            'checkedin' => CheckedIn::all(),
        ]);
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
}
