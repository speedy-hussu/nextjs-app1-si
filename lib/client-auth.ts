/**
 * Client-side authentication utilities
 * Use these in client components
 */

/**
 * Check if user is authenticated by verifying token
 */
export async function checkAuth(): Promise<{
  isAuthenticated: boolean;
  user?: {
    userId: string;
    username: string;
    role: string;
  };
}> {
  try {
    const response = await fetch('/api/auth/verify', {
      method: 'GET',
      credentials: 'include', // Include cookies
    });

    if (response.ok) {
      const data = await response.json();
      return {
        isAuthenticated: true,
        user: data.user,
      };
    }
  } catch (error) {
    console.error('Auth check error:', error);
  }

  return {
    isAuthenticated: false,
  };
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    localStorage.removeItem('auth-token');
  } catch (error) {
    console.error('Logout error:', error);
  }
}



