import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn) {
        return true;
      }
      return false;
    },
    async redirect({ baseUrl }) {
      // Ohjaa aina kotisivulle
      return baseUrl;
    },
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log("............authorize............");
        console.log(
          credentials,
          credentials.password,
          "......USERTIEDOT......"
        );

        // Kovakoodatut käyttäjätunnus ja salasana
        const email = "t@t";
        const password = "t";
        let user = null;
        // Tarkista, että käyttäjätunnus ja salasana ovat oikein
        if (credentials.email === email && credentials.password === password) {
          return { id: 1, name: "Test User", email: "t@t" };
        }
        throw new Error("User not found.");

        return user;
      },
    }),
  ],
});
