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

        if (user.password === null) {
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
          name: profile.name,
          email: profile.email,
          firstName: profile.given_name,
          lastName: profile.family_name,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if ("emailVerified" in user) {
        throw new Error("we are not using a next-auth adapter");
      }

      if (account?.provider === "google" && user.email != undefined) {
        try {
          const dbUser = await db
            .selectFrom("users")
            .select("email")
            .where("email", "=", user.email)
            .executeTakeFirst();

          if (dbUser) {
            return true;
          } else {
            await db
              .insertInto("users")
              .values({
                email: user.email,
                password: "googlePassword",
                // @ts-expect-error TODO: Consider redoing authentication with Adapters or use a custom User type.
                first_name: user.firstName,
                // @ts-expect-error TODO: Consider redoing authentication with Adapters or use a custom User type.
                last_name: user.lastName,
                created_at: new Date(),
                updated_at: new Date(),
              })
              .execute();
          }
        } catch (e) {
          console.log("An error occurred with google SSO:", e);
          return false;
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
