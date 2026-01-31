'use client';

import React from 'react';
import { Form } from '@/components/auth/AuthForm';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { authClient } from '@/lib/auth-client';

export default function SignupForm() {
  const handleSubmit = async (email: string, password: string) => {
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    const result = await authClient.signUp.email(
      {
        email,
        password,
        name: email.split('@')[0],
      },
      {
        onSuccess: () => {
          window.location.href = '/dashboard';
        },
        onError: (ctx) => {
          const message = ctx.error?.message || 'Failed to create account';
          throw new Error(message);
        },
      },
    );

    if (result?.error) {
      throw new Error(result.error.message || 'Failed to create account');
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
      errorCallbackURL: '/auth/signup?error=google_failed',
    });
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join HireMind and start preparing with confidence"
      footer={
        <>
          <Form.FooterLink
            text="Already have an account?"
            linkText="Sign in"
            linkHref="/auth/login"
          />
          <Form.TermsFooter />
        </>
      }
    >
      <Form.Root onSubmit={handleSubmit} className="space-y-6">
        <Form.Error />

        <Form.EmailField placeholder="Enter your email" />

        <Form.PasswordField placeholder="Create a password" />

        <Form.SubmitButton loadingText="Creating account...">Sign Up</Form.SubmitButton>

        <Form.Separator />

        <Form.GoogleButton onGoogleSignIn={handleGoogleSignIn} text="Sign up with Google" />
      </Form.Root>
    </AuthLayout>
  );
}
