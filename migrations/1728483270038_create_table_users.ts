import { sql, type Kysely } from "kysely";
import { DB } from "@/app/database";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("email", "text", (col) => col.unique().notNull())
    .addColumn("password", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`NOW()`),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`NOW()`),
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("users").execute();
}
