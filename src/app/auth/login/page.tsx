'use client';

import React from 'react';
import { Form } from '@/components/auth/AuthForm';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Suspense } from 'react';

function LoginFormContent() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  const handleSubmit = async (email: string, password: string) => {
    const result = await authClient.signIn.email(
      { email, password },
      {
        onSuccess: () => {
          window.location.href = redirectTo;
        },
        onError: (ctx) => {
          const message = ctx.error?.message || 'Invalid email or password';
          throw new Error(message);
        },
      },
    );

    if (result?.error) {
      throw new Error(result.error.message || 'Invalid email or password');
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
      errorCallbackURL: '/auth/login?error=google_failed',
    });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to HireMind"
      footer={
        <>
          <Form.FooterLink
            text="Don't have an account?"
            linkText="Sign up"
            linkHref="/auth/signup"
          />
          <Form.TermsFooter />
        </>
      }
    >
      <Form.Root onSubmit={handleSubmit} className="space-y-6">
        <Form.Error />

        <Form.EmailField placeholder="Enter your email" />

        <div className="space-y-2">
          <Form.PasswordField placeholder="Enter your password" />
          <Form.ForgotPassword />
        </div>

        <Form.SubmitButton loadingText="Signing in...">Sign In</Form.SubmitButton>

        <Form.Separator />

        <Form.GoogleButton onGoogleSignIn={handleGoogleSignIn} />
      </Form.Root>
    </AuthLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
