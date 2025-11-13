# 🔐 Demo Accounts

## Quick Login

The login page now has **Quick Demo Login** buttons for easy testing.

### Demo Credentials

**Organizer Account:**
- Email: `organizer@demo.com`
- Password: `demo123`
- Click the "👤 Organizer" button to auto-fill

**Sponsor Account:**
- Email: `sponsor@demo.com`
- Password: `demo123`
- Click the "🏢 Sponsor" button to auto-fill

## How It Works

Demo accounts are automatically created in localStorage when you visit the login page. No signup needed!

## Remove Before Production

⚠️ **IMPORTANT**: Remove the demo login buttons before deploying to production.

To remove:
1. Delete the "Demo Account Quick Login" section from `/src/app/(auth)/login/page.tsx`
2. Remove the demo account creation logic from the `useEffect` hook
3. Delete this file

## Testing

1. Go to `http://localhost:3000/login`
2. Click either demo button
3. Click "Sign In"
4. You'll be redirected to the appropriate dashboard

That's it! No need to create accounts manually.
