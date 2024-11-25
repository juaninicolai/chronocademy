import { DB } from "@/app/database";
import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("user_data")
    .addColumn("user_id", "serial")
    // TODO: Add foreign key constraint for countries table
    .addColumn("origin_country", "text", (col) => col.notNull())
    .addColumn("birthdate", "date", (col) => col.notNull())
    .addColumn("first_name", "text", (col) => col.notNull())
    .addColumn("last_name", "text", (col) => col.notNull())
    // TODO: Add foreign key constraint for timezones table
    .addColumn("timezone", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`NOW()`),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`NOW()`),
    )
    .addForeignKeyConstraint("fk__users__user_data", ["user_id"], "users", [
      "id",
    ])
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("user_data").execute();
}
