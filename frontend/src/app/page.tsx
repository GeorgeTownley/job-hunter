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
        <div className="text-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              start your 14-day free trial
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <button
                onClick={() => {
                  console.log("clicked!");
                  signIn("github", {
                    callbackUrl: "http://localhost:3000/homepage",
                  });
                }}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in with GitHub
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
