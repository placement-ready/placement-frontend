# Advanced Authentication Flow

## Overview

This authentication system implements a smart flow that checks user existence and routes users accordingly.

## Flow Logic

### 1. Login Page (`/auth/login`)

- User enters email
- System checks if user exists (mock implementation)
- **If user exists**: Redirects to `/auth/login/password?email=user@example.com`
- **If user doesn't exist**: Redirects to `/auth/create-account?email=user@example.com`

### 2. Create Account Page (`/auth/create-account`)

- User enters email (pre-filled if coming from login redirect)
- System checks if user exists (mock implementation)
- **If user exists**: Redirects to `/auth/login?email=user@example.com`
- **If user doesn't exist**: Redirects to `/auth/create-account/password?email=user@example.com`

### 3. Login Password Page (`/auth/login/password`)

- Requires email parameter in URL
- User enters password
- Mock login logic with console logging
- On success: Redirects to `/profile`

### 4. Create Account Password Page (`/auth/create-account/password`)

- Requires email parameter in URL
- User creates password with validation requirements:
  - At least 8 characters
  - Uppercase letter
  - Lowercase letter
  - Number
- Password confirmation field
- On success: Redirects to `/auth/email-verification?email=user@example.com`

## Testing the Flow

### Test User Existence Logic

- Use an email containing "existing" (e.g., `existing@test.com`) to simulate existing user
- Use any other email to simulate new user

### Example Flow for New User:

1. Go to `/auth/login`
2. Enter `newuser@test.com`
3. → Redirects to `/auth/create-account?email=newuser@test.com`
4. Click "Continue" (email pre-filled)
5. → Redirects to `/auth/create-account/password?email=newuser@test.com`
6. Create password meeting requirements
7. → Redirects to `/auth/email-verification?email=newuser@test.com`

### Example Flow for Existing User:

1. Go to `/auth/create-account`
2. Enter `existing@test.com`
3. → Redirects to `/auth/login?email=existing@test.com`
4. Click "Continue" (email pre-filled)
5. → Redirects to `/auth/login/password?email=existing@test.com`
6. Enter password
7. → Redirects to `/profile`

## Implementation Notes

- All authentication logic uses console.log for now
- Mock user existence check looks for "existing" in email
- Password validation includes real-time feedback
- Error handling with user-friendly messages
- Proper loading states and disabled button logic
- Google OAuth integration ready (uses NextAuth)

## Future Implementation

Replace mock functions with actual API calls:

- `checkUserExists(email)` → API call to check user in database
- `login(email, password)` → API call for authentication
- `createAccount(email, password)` → API call to create user
- `verifyEmailCode(email, code)` → API call for email verification
- `resendVerificationEmail(email)` → API call to resend verification
