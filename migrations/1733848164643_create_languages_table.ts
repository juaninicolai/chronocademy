import { DB } from "@/app/database";
import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("languages")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("language", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`NOW()`),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`NOW()`),
    )
    .execute();

  await db.schema
    .alterTable("user_languages")
    .dropColumn("language")
    .addColumn("language_id", "serial")
    .execute();

  await db.schema
    .alterTable("user_languages")
    .addForeignKeyConstraint(
      "fk__languages__user_languages",
      ["language_id"],
      "languages",
      ["id"],
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema
    .alterTable("user_languages")
    .dropConstraint("fk__languages__user_languages")
    .execute();

  await db.schema.dropTable("languages").execute();
}
