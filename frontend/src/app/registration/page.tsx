`use client`;
import React, { useState, useEffect } from "react";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("User created with ID:", data.id);
        // Redirect to sign-in page or dashboard
      } else {
        // Handle errors
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

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
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 sm:text-sm"
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
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-b from-green-600 to-green-800 hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-6">
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
