import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/database";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { hash } from "bcrypt";
import { DatabaseError } from "pg";

YupPassword(Yup);

const SALT_ROUNDS = 8;

const RequestBodySchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().password().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
});

type User = {
  email: string;
  firstName: string;
  lastName: string;
};

export async function POST(req: NextRequest) {
  let signUpDto;
  try {
    signUpDto = await RequestBodySchema.validate(await req.json(), {
      abortEarly: false,
    });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return NextResponse.json(
        {
          errors: error.inner.map((property) => ({
            message: property.message,
            path: property.path,
          })),
        },
        { status: 400 },
      );
    }
    throw error;
  }

  const hashedPassword = await hash(signUpDto.password, SALT_ROUNDS);

  let dbUser;
  try {
    dbUser = await db
      .insertInto("users")
      .values({
        email: signUpDto.email,
        password: hashedPassword,
        first_name: signUpDto.firstName,
        last_name: signUpDto.lastName,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  } catch (error) {
    if (
      error instanceof DatabaseError &&
      error.code === "23505" &&
      error.constraint === "users_email_key"
    ) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 },
      );
    }
    throw error;
  }

  const user: User = {
    email: dbUser.email,
    firstName: dbUser.first_name,
    lastName: dbUser.last_name,
  };

  return NextResponse.json(user, { status: 201 });
}
