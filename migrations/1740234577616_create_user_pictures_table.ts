import { DB } from "@/app/database";
import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("user_pictures")
    .addColumn("user_id", "serial", (col) => col.unique())
    .addColumn("blob", "bytea", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`NOW()`),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`NOW()`),
    )
    .addForeignKeyConstraint("fk__users__user_pictures", ["user_id"], "users", [
      "id",
    ])
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("user_pictures").execute();
}
