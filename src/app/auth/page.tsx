"use client";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { config } from "@/lib/config";

const AuthPage = () => {
  return (
    <div>
      <h1>Auth Page</h1>
      <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={(response) => {
            // バックエンドに送信
            fetch("/api/auth/google", {
              method: "POST",
              body: JSON.stringify({ credential: response.credential }),
            });
            const decoded = JSON.parse(
              atob(response?.credential?.split(".")[1] ?? ""),
            );
            console.log(decoded);
          }}
          onError={() => console.log("Failed")}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default AuthPage;
