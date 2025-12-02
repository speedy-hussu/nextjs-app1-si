"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth, logout } from "@/lib/client-auth";
import Link from "next/link";

export default function AdminDashboard() {
  const [user, setUser] = useState<{
    userId: string;
    username: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      const authResult = await checkAuth();
      if (authResult.isAuthenticated && authResult.user) {
        setUser(authResult.user);
      } else {
        router.push("/admin/login");
      }
      setLoading(false);
    };

    verifyAuth();
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-full bg-gray-100 p-8 pt-32">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome, {user.username}!
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-4">
              <Link
                href="/admin/products"
                className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-lg transition text-center"
              >
                Manage Products
              </Link>
              <Link
                href="/admin/blog"
                className="block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-4 rounded-lg transition text-center"
              >
                Manage Blog
              </Link>
              <Link
                href="/admin/newsletter"
                className="block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-4 rounded-lg transition text-center"
              >
                Send Newsletter
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Account Info
            </h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                <strong>User ID:</strong> {user.userId}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Username:</strong> {user.username}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Role:</strong> {user.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

