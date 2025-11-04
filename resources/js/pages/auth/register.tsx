import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useMemo } from 'react'; // 👈 Import useMemo

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {

    // Logic to determine if the "Already have an account?" link should be displayed
    const shouldShowLoginLink = useMemo(() => {
        if (typeof window === 'undefined') {
            // Default to showing the link during Server-Side Rendering (SSR)
            return true;
        }

        try {
            // 1. Get the 'ref' query parameter from the CURRENT URL
            const urlParams = new URLSearchParams(window.location.search);
            const currentRefParam = urlParams.get('ref');

            // 2. If there is NO 'ref' parameter, we should show the link
            if (!currentRefParam) {
                return true;
            }
            
            // 3. Decode the 'ref' parameter to get the actual referrer URL
            const decodedReferrer = decodeURIComponent(currentRefParam);

            // 4. Check if the decoded referrer is complex (i.e., contains a query string '?')
            // A complex referrer suggests this registration flow is part of a redirected path.
            const isComplexReferrer = decodedReferrer.includes('?');

            // We hide the login link if a complex referrer is present.
            // Therefore, we show the link only if the referrer is NOT complex.
            return !isComplexReferrer;

        } catch (e) {
            console.error("Error parsing URL for login link decision:", e);
            // Default to showing on error
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
                        {/* ... (Your form inputs remain here) ... */}

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

                        {/* 👈 CONDITIONAL RENDERING APPLIED HERE */}
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