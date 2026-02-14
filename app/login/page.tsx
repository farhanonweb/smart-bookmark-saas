"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-950">

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-lg bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12 text-white">

          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-xl font-bold shadow-lg">
              SB
            </div>
            <span className="text-2xl font-semibold tracking-wide">
              SmartBook
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3">
            Welcome Back 👋
          </h1>

          <p className="text-gray-400 text-center mb-10 text-sm sm:text-base">
            Manage and access your bookmarks securely.
          </p>

          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-6 h-6"
            >
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.773 31.91 29.36 35 24 35c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.152 7.964 3.036l5.657-5.657C33.876 6.053 29.215 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.152 7.964 3.036l5.657-5.657C33.876 6.053 29.215 4 24 4c-7.732 0-14.41 4.411-17.694 10.691z"/>
              <path fill="#4CAF50" d="M24 44c5.29 0 10.088-2.021 13.657-5.343l-6.307-5.336C29.37 34.825 26.82 36 24 36c-5.326 0-9.724-3.592-11.259-8.438l-6.52 5.025C9.458 39.556 16.204 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.06 3.094-3.279 5.685-6.353 7.321l6.307 5.336C39.904 36.926 44 30.984 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>

            Continue with Google
          </button>

          <p className="text-xs text-gray-500 text-center mt-8">
            Secure authentication powered by Google OAuth
          </p>

        </div>
      </div>

      <footer className="mt-auto border-t border-gray-800 py-8 px-6 md:px-20 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} SmartBook — Developed by Farhan Gheri
      </footer>

    </div>
  );
}
