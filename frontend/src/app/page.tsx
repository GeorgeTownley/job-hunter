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
    <div>
      <button
        onClick={() => {
          console.log("clicked!");
          signIn("github", { callbackUrl: "http://localhost:3000/homepage" });
        }}
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
