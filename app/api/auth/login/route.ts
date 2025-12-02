import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/lib/jwt';

// In production, store credentials securely (database, environment variables, etc.)
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Verify credentials
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // Generate JWT token
      const token = generateToken({
        userId: 'admin',
        username: username,
        role: 'admin',
      });

      const response = NextResponse.json(
        {
          success: true,
          message: 'Login successful',
          user: {
            username: username,
            role: 'admin',
          },
        },
        { status: 200 }
      );

      // Set HTTP-only cookie for additional security
      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return response;
    } else {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}



