"use client";
import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    console.log("Current user:", session.user);
    // Redirect the user to the home page or display a message
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-xl">
        {/* Logo and App Name */}
        <div className="flex justify-center items-center transform scale-150">
          <img
            className="h-5 w-5 mr-2"
            src="/assets/bow_arrow.png"
            alt="Bow & arrow logo"
          />
          <span className="text-xl font-medium uppercase tracking-wider">
            JOB HUNTER
          </span>
        </div>
        <div className="text-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="w-1/2 flex justify-center items-center py-2.5 px-4 text-sm font-medium rounded-lg text-white bg-gradient-to-b from-green-600 to-green-800 hover:brightness-90 "
            >
              Sign in
            </button>
            <button
              onClick={() => {
                console.log("clicked!");
                signIn("github", {
                  callbackUrl: "http://localhost:3000/homepage",
                });
              }}
              type="button"
              className="w-1/2 text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30"
            >
              <svg
                className="w-6 h-6 mr-2"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.534 1.35.198 2.346.097 2.594.627.682 1.008 1.555 1.008 2.623 0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clipRule="evenodd"
                />
              </svg>
              Sign in with GitHub
            </button>
          </div>
        </form>
        <div className="mt-6">
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/registration"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
