import { DB } from "@/app/database";
import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("countries")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("country", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`NOW()`),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`NOW()`),
    )
    .execute();

  await db.schema
    .alterTable("user_data")
    .dropColumn("origin_country")
    .addColumn("origin_country", "serial")
    .execute();

  await db.schema
    .alterTable("user_data")
    .addForeignKeyConstraint(
      "fk__countries__user_data",
      ["origin_country"],
      "countries",
      ["id"],
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema
    .alterTable("user_data")
    .dropConstraint("fk__countries__user_data")
    .execute();

  await db.schema.dropTable("countries").execute();
}
