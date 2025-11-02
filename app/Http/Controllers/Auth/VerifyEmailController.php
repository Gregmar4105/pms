<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        $user = $request->user();
        
        // Define the default successful redirect URL (dashboard)
        $defaultRedirectUrl = route('dashboard', absolute: false);

        // 1. Determine the intended redirect URL
        $redirectUrl = $defaultRedirectUrl;

        // Check if the user has an 'origin_url' saved in the database
        if ($user->origin_url) {
            
            // **New Logic:** Check if the saved URL looks like a login/auth page.
            if (!str_contains($user->origin_url, '/login') && !str_contains($user->origin_url, '/register') && !str_contains($user->origin_url, '/password/reset')) {
                
                // If it's *not* a login/auth page, use the saved 'origin_url'.
                $baseUrl = strtok($user->origin_url, '?');
                $redirectUrl = $baseUrl;
            }
            // If the URL *does* contain '/login', $redirectUrl remains '/dasboard'
        }
        
        // 2. Handle the verification process
        if ($user->hasVerifiedEmail()) {
            // If already verified, redirect to the determined URL
            // CHANGED: Removed "intended()" to force redirect to our custom URL
            return redirect($redirectUrl);
        }

        // Fulfill the verification request (marks email as verified and updates timestamp)
        $request->fulfill();

        // 3. Redirect after successful verification
        // CHANGED: Removed "intended()" to force redirect to our custom URL
        return redirect($redirectUrl);
    }
}