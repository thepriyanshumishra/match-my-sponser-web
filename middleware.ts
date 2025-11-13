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
  const sessionCookie = request.cookies.get('auth_session');
  if (sessionCookie) {
    try {
      return JSON.parse(sessionCookie.value);
    } catch {
      return null;
    }
  }
  return null;
}

export function middleware(request: NextRequest) {
  // Skip middleware - let client-side handle auth
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
