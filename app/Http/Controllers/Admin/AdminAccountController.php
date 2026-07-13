<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class AdminAccountController extends Controller
{
    /**
     * Display a listing of the admins.
     */
    public function index()
    {
        $admins = User::where('is_admin', true)->orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Admins/Index', [
            'admins' => $admins,
        ]);
    }

    /**
     * Store a newly created admin in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'is_super_admin' => 'boolean',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_admin' => true,
            'is_super_admin' => $request->boolean('is_super_admin'),
        ]);

        return redirect()->route('admin.admins.index')->with('success', 'Administrateur créé avec succès.');
    }

    /**
     * Update the specified admin in storage.
     */
    public function update(Request $request, User $admin)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $admin->id,
            'is_super_admin' => 'boolean',
        ];

        if ($request->filled('password')) {
            $rules['password'] = ['confirmed', Rules\Password::defaults()];
        }

        $request->validate($rules);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
        ];

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        // Prevent a super admin from removing their own super admin status
        if ($admin->id === auth()->id() && !$request->boolean('is_super_admin')) {
            return back()->withErrors(['is_super_admin' => 'Vous ne pouvez pas retirer votre propre rôle super administrateur.']);
        }

        $data['is_super_admin'] = $request->boolean('is_super_admin');

        $admin->update($data);

        return redirect()->route('admin.admins.index')->with('success', 'Administrateur mis à jour avec succès.');
    }

    /**
     * Remove the specified admin from storage.
     */
    public function destroy(User $admin)
    {
        if ($admin->id === auth()->id()) {
            return back()->withErrors(['message' => 'Vous ne pouvez pas supprimer votre propre compte.']);
        }

        $admin->delete();

        return redirect()->route('admin.admins.index')->with('success', 'Administrateur supprimé avec succès.');
    }
}
