"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>Verifying authentication…</div>}>
      <AuthCallbackClient />
    </Suspense>
  );
}

function AuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function verifyAuth() {
      try {
        const errorParam = searchParams.get("error");
        if (errorParam) {
          throw new Error(errorParam);
        }

        const tokenParam = searchParams.get("access_token");
        if (tokenParam) {
          localStorage.setItem("access_token", tokenParam);
          setStatus("success");
          setTimeout(() => router.push("/"), 1000);
          return;
        }

        const existingToken = localStorage.getItem("access_token");
        if (!existingToken) {
          throw new Error("No authentication token found");
        }

        const api = process.env.NEXT_PUBLIC_API_URL ?? "https://localhost:8443/api";
        
        const res = await fetch(`${api}/auth/me`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${existingToken}`,
          },
        });

        if (res.ok) {
          setStatus("success");
          setTimeout(() => router.push("/"), 1000);
        } else {
          throw new Error("Authentication verification failed");
        }
      } catch (err: unknown) {
        setStatus("error");
        setError(err instanceof Error ? err.message : "Authentication failed");
      }
    }

    verifyAuth();
  }, [router, searchParams]);

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "100vh" 
    }}>
      {status === "loading" && (
        <>
          <div className="spinner" />
          <p>Verifying authentication...</p>
        </>
      )}
      
      {status === "success" && (
        <>
          <p style={{ color: "green", fontSize: "1.2rem" }}>✓ Authentication successful!</p>
          <p>Redirecting...</p>
        </>
      )}
      
      {status === "error" && (
        <>
          <p style={{ color: "red", fontSize: "1.2rem" }}>✗ Authentication failed</p>
          <p>{error}</p>
          <button 
            onClick={() => router.push("/auth/login")}
            style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
          >
            Back to login
          </button>
        </>
      )}

      <style jsx>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
