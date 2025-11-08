<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController extends Controller
{
    
    public function index()
    {
        $users = User::with('roles')
                ->latest()->paginate(10);

        return Inertia::render("Users/Index" , [
            'users' => $users,
        ]);
    }
}
