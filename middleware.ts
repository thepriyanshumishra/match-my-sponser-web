import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface AuthSession {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'organizer' | 'sponsor';
  };
  accessToken: string;
  refreshToken: string;
}

function getSession(request: NextRequest): AuthSession | null {
  // Try to get session from cookie first (more secure)
  const sessionCookie = request.cookies.get('auth_session');
  if (sessionCookie) {
    try {
      return JSON.parse(sessionCookie.value);
    } catch {
      return null;
    }
  }

  // Fallback: check if there's a session header (for client-side requests)
  const sessionHeader = request.headers.get('x-auth-session');
  if (sessionHeader) {
    try {
      return JSON.parse(sessionHeader);
    } catch {
      return null;
    }
  }

  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get session from request
  const session = getSession(request);

  // Protect organizer routes
  if (pathname.startsWith('/organizer')) {
    if (!session) {
      // Not authenticated - redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (session.user.role !== 'organizer') {
      // Wrong role - redirect to appropriate dashboard
      if (session.user.role === 'sponsor') {
        return NextResponse.redirect(new URL('/sponsor/dashboard', request.url));
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect sponsor routes
  if (pathname.startsWith('/sponsor')) {
    if (!session) {
      // Not authenticated - redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (session.user.role !== 'sponsor') {
      // Wrong role - redirect to appropriate dashboard
      if (session.user.role === 'organizer') {
        return NextResponse.redirect(new URL('/organizer/dashboard', request.url));
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirect authenticated users away from auth pages
  if (pathname === '/login' || pathname === '/signup') {
    if (session) {
      // Already authenticated - redirect to appropriate dashboard
      if (session.user.role === 'organizer') {
        return NextResponse.redirect(new URL('/organizer/dashboard', request.url));
      } else if (session.user.role === 'sponsor') {
        return NextResponse.redirect(new URL('/sponsor/dashboard', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/organizer/:path*',
    '/sponsor/:path*',
    '/login',
    '/signup',
  ],
};
