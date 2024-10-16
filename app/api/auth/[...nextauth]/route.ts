import NextAuth, { User as NextUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/app/database";
import { compare } from "bcrypt";

const handler = NextAuth({
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
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
        if (credentials === undefined) {
          return null;
        }

        const user = await db
          .selectFrom("users")
          .select(["id", "first_name", "last_name", "email", "password"])
          .where("email", "=", credentials.email)
          .executeTakeFirst();

        if (user === undefined) {
          return null;
        }

        const isPasswordMatch = await compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordMatch) {
          return null;
        }

        const nextUser: NextUser = {
          id: String(user.id),
          email: user.email,
          name: `${user.first_name} ${user.last_name}`,
        };

        return nextUser;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          firstName: profile.given_name,
          lastName: profile.family_name,
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
