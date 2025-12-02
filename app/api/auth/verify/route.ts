import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  try {
    // Try to get token from Authorization header
    const authHeader = request.headers.get('authorization');
    let token = extractTokenFromHeader(authHeader);

    // If not in header, try to get from cookie
    if (!token) {
      token = request.cookies.get('auth-token')?.value || null;
    }

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        valid: true,
        user: decoded,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}



