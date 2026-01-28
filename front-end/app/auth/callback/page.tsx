"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function verifyAuth() {
      try {
        const api = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
        
        const res = await fetch(`${api}/auth/me`, {
          method: "GET",
          credentials: "include",
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
  }, [router]);

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
