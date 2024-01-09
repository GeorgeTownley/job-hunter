import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

// Assert that the environment variables are set
const GITHUB_ID = process.env.GITHUB_ID!;
const GITHUB_SECRET = process.env.GITHUB_SECRET!;

if (!GITHUB_ID || !GITHUB_SECRET) {
  throw new Error(
    "Please define the GITHUB_ID and GITHUB_SECRET environment variables"
  );
}

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: GITHUB_ID, // Use the asserted variables
      clientSecret: GITHUB_SECRET,
    }),
  ],
  callbacks: {
    // The redirect callback expects an object with `url` and `baseUrl` properties
    redirect: async ({ url, baseUrl }: { url: any; baseUrl: any }) => {
      // You can perform additional checks here if needed
      return `${baseUrl}/homepage`; // This should redirect to the root of your site after login
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
