import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Credentials({
      // Implement custom sign in logic here
      authorize: async (credentials) => {
        // You should replace this with a real database check
        if (
          credentials.username === "user" &&
          credentials.password === "password"
        ) {
          return Promise.resolve({
            id: 1,
            name: "User",
            email: "user@example.com",
          });
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  // Configure NextAuth options here
});
