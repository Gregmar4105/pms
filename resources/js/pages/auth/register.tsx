import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useMemo } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {

    // --- NEW LOGIC: Extract and save the decoded referrer URL ---
    const decodedReferrer = useMemo(() => {
        if (typeof window === 'undefined') {
            return null; // Return null during SSR
        }

        try {
            const urlParams = new URLSearchParams(window.location.search);
            const currentRefParam = urlParams.get('ref');

            // 1. If no 'ref' param, return null
            if (!currentRefParam) {
                return null;
            }
            
            // 2. Decode the 'ref' parameter
            return decodeURIComponent(currentRefParam);

        } catch (e) {
            console.error("Error parsing URL for referrer:", e);
            return null; // Return null on error
        }
    }, []);
    // -----------------------------------------------------------

    // Logic to determine if the "Already have an account?" link should be displayed
    const shouldShowLoginLink = useMemo(() => {
        // We can reuse the logic, which depends on the presence and complexity of the 'ref' param.
        // It's already correctly set up to use the 'ref' param for the logic.
        if (typeof window === 'undefined') {
            return true; 
        }

        try {
            const urlParams = new URLSearchParams(window.location.search);
            const currentRefParam = urlParams.get('ref');

            if (!currentRefParam) {
                return true;
            }
            
            const referrer = decodeURIComponent(currentRefParam);

            // Hide the login link if a complex referrer (contains '?') is present.
            const isComplexReferrer = referrer.includes('?');
            return !isComplexReferrer;

        } catch (e) {
            console.error("Error parsing URL for login link decision:", e);
            return true;
        }
    }, []);

    return (
        <AuthLayout
            title="Create an account"
            description="Enter your details below to create your account"
        >
            <Head title="Register" />
            <Form
                {...RegisteredUserController.store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        {/* --- NEW: Hidden Input for Referral URL --- */}
                        {decodedReferrer && (
                            <input
                                type="hidden"
                                name="ref_url" // 👈 This name must match the backend validation/field
                                value={decodedReferrer}
                            />
                        )}
                        {/* ------------------------------------------ */}
                        
                        <div className="grid gap-6">
                            {/* Name Input */}
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Full name"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            {/* Password Input */}
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            {/* Confirm Password Input */}
                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && (
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                )}
                                Create account
                            </Button>
                        </div>

                        {/* CONDITIONAL RENDERING APPLIED HERE */}
                        {shouldShowLoginLink && (
                            <div className="text-center text-sm text-muted-foreground">
                                Already have an account?{' '}
                                <TextLink href={login()} tabIndex={6}>
                                    Log in
                                </TextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}