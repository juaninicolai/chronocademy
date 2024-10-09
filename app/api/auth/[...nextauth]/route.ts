import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/app/database";
import { compare } from "bcrypt";

const handler = NextAuth({
  theme: {
    colorScheme: "light",
    logo: "/logo_dark_mode.svg",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) {
          //return error
          return null;
        }

        const users = await db
          .selectFrom("users")
          .select(["id", "email", "password"])
          .where("email", "=", credentials.email)
          .execute();

        if (users.length === 0) {
          //return an error
          return null;
        }

        const isPasswordMatch = await compare(
          credentials.password,
          users[0].password,
        );

        if (!isPasswordMatch) {
          //return error
          return null;
        }

        const user: User = {
          id: String(users[0].id),
          email: users[0].email,
        };

        return user;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
