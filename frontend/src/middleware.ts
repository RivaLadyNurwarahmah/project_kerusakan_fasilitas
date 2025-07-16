import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id_user: number;
  peran: string;
  exp: number;
}

const protectedRoutes = {
  admin: ['/admin'],
  teknisi: ['/teknisi'],
  umum: ['/umum'],
};

const publicRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  let decodedToken: DecodedToken | null = null;
  if (token) {
    try {
      decodedToken = jwtDecode<DecodedToken>(token);
      // Check if token is expired
      if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
        decodedToken = null;
      }
    } catch (error) {
      console.error('Invalid token:', error);
      decodedToken = null;
    }
  }

  const userRole = decodedToken?.peran;
  const isAuthenticated = !!decodedToken;

  // Redirect logged-in users from public routes
  if (isAuthenticated && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url));
  }

  // Check protected routes
  const allProtectedRoutes = Object.values(protectedRoutes).flat();
  const isProtectedRoute = allProtectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const allowedRoles = Object.entries(protectedRoutes).find(([role, routes]) =>
      routes.some(route => pathname.startsWith(route))
    )?.[0];

    if (allowedRoles && userRole !== allowedRoles) {
      return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/teknisi/:path*',
    '/umum/:path*',
    '/login',
    '/register',
  ],
};
