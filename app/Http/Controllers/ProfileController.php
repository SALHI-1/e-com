<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        $orders = $user->orders()
            ->with(['items.product'])
            ->latest()
            ->get();

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'orders' => $orders,
            'cartCount' => array_sum(session()->get('cart', [])),
        ]);
    }

    /**
     * Download the delivery slip for a customer's order.
     */
    public function orderTicket(Request $request, \App\Models\Order $order)
    {
        if ($order->user_id !== $request->user()->id && !$request->user()->is_admin) {
            abort(403);
        }

        $order->load(['user', 'items.product']);
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('admin.orders.ticket', compact('order'));
        return $pdf->download('ticket-' . $order->order_number . '.pdf');
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
