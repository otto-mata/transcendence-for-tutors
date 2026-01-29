"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Backend } from "@/client/TransClient";
import { Loader2, CheckCircle, XCircle, Mail } from "lucide-react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function verifyEmail() {
      try {
        const token = searchParams.get("token");
        
        if (!token) {
          setStatus("error");
          setMessage("No verification token provided. Please check your email link.");
          return;
        }

        const client = Backend.getInstance();
        const res = await client.auth.verify({ token });

        if (!res.ok) {
          const axiosError = res.error as any;
          const errorMessage = axiosError?.response?.data?.message 
            || axiosError?.message 
            || "Email verification failed";
          throw new Error(errorMessage);
        }

        const data = typeof res.value === 'string' ? JSON.parse(res.value) : res.value;
        
        setStatus("success");
        setMessage(data?.message || "Your email has been verified successfully!");
        
        // Redirect to login after 3 seconds
        setTimeout(() => router.push("/auth/login"), 3000);
      } catch (err: unknown) {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Email verification failed");
      }
    }

    verifyEmail();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700/50">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            {status === "loading" && (
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
              </div>
            )}
            {status === "success" && (
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            )}
            {status === "error" && (
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            {status === "loading" && "Verifying Email"}
            {status === "success" && "Email Verified!"}
            {status === "error" && "Verification Failed"}
          </h1>

          {/* Message */}
          <p className={`text-center mb-6 ${
            status === "loading" ? "text-gray-400" :
            status === "success" ? "text-green-400" :
            "text-red-400"
          }`}>
            {status === "loading" ? "Please wait while we verify your email address..." : message}
          </p>

          {/* Actions */}
          {status === "success" && (
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-4">
                Redirecting to login in 3 seconds...
              </p>
              <button
                onClick={() => router.push("/auth/login")}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
              >
                Go to Login
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-3">
              <button
                onClick={() => router.push("/auth/login")}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
              >
                Go to Login
              </button>
              <button
                onClick={() => router.push("/auth/register")}
                className="w-full py-3 px-4 bg-gray-700/50 hover:bg-gray-700 text-gray-200 font-semibold rounded-lg transition-all duration-200 border border-gray-600"
              >
                Register Again
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-700/50">
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              <Mail className="w-4 h-4" />
              <span>Email Verification</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
