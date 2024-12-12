import { DB } from "@/app/database";
import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("user_languages")
    .addColumn("user_id", "serial")
    .addColumn("language", "text", (col) => col.notNull())
    .addColumn("level", "text", (col) =>
      col
        .notNull()
        .check(
          sql`level IN ('beginner', 'intermediate', 'advanced', 'native')`,
        ),
    )
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`NOW()`),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`NOW()`),
    )
    .addForeignKeyConstraint(
      "fk__users__user_languages",
      ["user_id"],
      "users",
      ["id"],
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("user_languages").execute();
}
