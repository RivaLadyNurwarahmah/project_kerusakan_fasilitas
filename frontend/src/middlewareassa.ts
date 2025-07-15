import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const userRole = request.cookies.get('userRole')?.value;

  // If trying to access login page while already logged in
  if (request.nextUrl.pathname === '/teknisi/login' && token) {
    return NextResponse.redirect(new URL('/teknisi/dashboard', request.url))
  }

  // If trying to access protected pages without token
  if (!token && request.nextUrl.pathname.startsWith('/teknisi')) {
    if (request.nextUrl.pathname !== '/teknisi/login') {
      return NextResponse.redirect(new URL('/teknisi/login', request.url))
    }
  }

  // If trying to access teknisi pages with wrong role
  if (token && userRole !== 'teknisi' && request.nextUrl.pathname.startsWith('/teknisi')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
 
export const config = {
  matcher: '/teknisi/:path*'
}
