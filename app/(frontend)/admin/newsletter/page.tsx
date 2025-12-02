"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/app/(backend)/lib/client-auth";
import { Mail, Download, AlertCircle, CheckCircle, Users } from "lucide-react";
import { useEffect } from "react";

export default function AdminNewsletterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({ type: "", message: "" });
  const [isDownloading, setIsDownloading] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);

  useEffect(() => {
    const verify = async () => {
      const authResult = await checkAuth();
      if (!authResult.isAuthenticated || authResult.user?.role !== "admin") {
        router.push("/admin/login");
      } else {
        setLoading(false);
        // Fetch subscriber count
        fetchSubscriberCount();
      }
    };

    verify();
  }, [router]);

  const fetchSubscriberCount = async () => {
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        setSubscriberCount(data.count || 0);
      }
    } catch (error) {
      console.error("Error fetching subscriber count:", error);
    }
  };

  const handleDownloadCSV = async () => {
    setIsDownloading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/newsletter/export", {
        method: "GET",
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;

        // Get filename from Content-Disposition header or use default
        const contentDisposition = res.headers.get("Content-Disposition");
        let filename = "newsletter-subscribers.csv";
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="(.+)"/);
          if (filenameMatch) {
            filename = filenameMatch[1];
          }
        }

        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setStatus({
          type: "success",
          message: "CSV file downloaded successfully!",
        });
      } else {
        const data = await res.json();
        setStatus({
          type: "error",
          message: data.message || "Failed to download CSV file.",
        });
      }
    } catch (error) {
      console.error("Download CSV error:", error);
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Checking admin access...</div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-100 p-8 pt-32">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Newsletter Subscribers
              </h1>
              <p className="text-gray-600 text-sm">
                Download a CSV file containing all subscribed user emails.
              </p>
            </div>
          </div>

          {status.message && (
            <div
              className={`mb-4 flex items-center gap-2 rounded-md px-4 py-3 text-sm ${
                status.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span>{status.message}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Subscriber Count Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Subscribers</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {subscriberCount !== null ? subscriberCount : "..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={handleDownloadCSV}
                disabled={isDownloading || subscriberCount === 0}
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Download className="w-5 h-5" />
                {isDownloading
                  ? "Downloading..."
                  : "Download Subscribers CSV File"}
              </button>
              <p className="mt-3 text-xs text-gray-500 text-center">
                The CSV file will contain email addresses and subscription dates
                of all newsletter subscribers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
