<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Http;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Roles/Index" , [
            'roles' => Role::with("permissions")->get(),
            'permissions' => Permission::pluck('name'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'permissions' => 'required|array',
        ]);

        $webhookUrlRoleName = env('N8N_CREATE_ROLE_URL');
        $webhookUrlSyncPermission = env('N8N_SYNC_PERMISSION_URL');

        DB::beginTransaction();

        try {
        
            $responseRole = Http::post($webhookUrlRoleName, [
                'name' => $request->name,
                'guard_name' => "web",
                'created_at' => now()->toDateTimeString(),
                'updated_at' => now()->toDateTimeString(),
            ]);

            if (!$responseRole->successful()) {
                throw new \Exception('Role creation webhook failed.', 500);
            }

            $roleId = $responseRole->json('id'); 
            
            $responsePermission = Http::post($webhookUrlSyncPermission, [
                'role_id' => $roleId,
                'permission_ids' => $request->permissions,
            ]);

            if (!$responsePermission->successful()) {
                
                throw new \Exception('Permission sync webhook failed.', 500);
            }

            DB::commit();

            return redirect()->route('roles.index')->with('success', 'Role and permissions successfully created.');

        } catch (\Throwable $e) {
            
            DB::rollBack();

            $errorMessage = $e->getCode() == 500 
                ? $e->getMessage() 
                : 'A server error occurred during the process.';

            return back()->withErrors(['webhook' => $errorMessage]);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
