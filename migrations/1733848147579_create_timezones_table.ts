import { DB } from "@/app/database";
import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("timezones")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("timezone", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`NOW()`),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`NOW()`),
    )
    .execute();

  await db.schema
    .alterTable("user_data")
    .dropColumn("timezone")
    .addColumn("timezone", "serial")
    .execute();

  await db.schema
    .alterTable("user_data")
    .addForeignKeyConstraint(
      "fk__timezones__user_data",
      ["timezone"],
      "timezones",
      ["id"],
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema
    .alterTable("user_data")
    .dropConstraint("fk__timezones__user_data")
    .execute();

  await db.schema.dropTable("timezones").execute();
}
