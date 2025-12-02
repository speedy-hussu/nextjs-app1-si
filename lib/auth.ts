import { NextRequest } from 'next/server';
import { verifyToken, extractTokenFromHeader } from './jwt';

export interface AuthResult {
  isAuthenticated: boolean;
  user?: {
    userId: string;
    username: string;
    role: string;
  };
  error?: string;
}

/**
 * Middleware function to verify authentication
 * Use this in API routes or server components
 */
export async function verifyAuth(request: NextRequest): Promise<AuthResult> {
  try {
    // Try to get token from Authorization header
    const authHeader = request.headers.get('authorization');
    let token = extractTokenFromHeader(authHeader);

    // If not in header, try to get from cookie
    if (!token) {
      token = request.cookies.get('auth-token')?.value || null;
    }

    if (!token) {
      return {
        isAuthenticated: false,
        error: 'No authentication token provided',
      };
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return {
        isAuthenticated: false,
        error: 'Invalid or expired token',
      };
    }

    return {
      isAuthenticated: true,
      user: decoded,
    };
  } catch (error) {
    console.error('Auth verification error:', error);
    return {
      isAuthenticated: false,
      error: 'Authentication error',
    };
  }
}

/**
 * Check if user has admin role
 */
export function isAdmin(user: { role: string } | undefined): boolean {
  return user?.role === 'admin';
}



