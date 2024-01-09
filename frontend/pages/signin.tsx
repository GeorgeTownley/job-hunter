import { useSession, signIn } from "next-auth/react";

const SignInPage = () => {
  const { data: session } = useSession();

  if (session) {
    console.log("Current user:", session.user);
    // Redirect the user to the home page or display a message
  }

  return (
    <div>
      <button
        onClick={() =>
          signIn("github", { callbackUrl: "http://localhost:3000" })
        }
      >
        Sign in with GitHub
      </button>
    </div>
  );
};

export default SignInPage;
