import { DB } from "@/app/database";
import type { Kysely } from "kysely";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .alterTable("user_skills")
    .addColumn("description", "text")
    .addColumn("price", "decimal")
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema
    .alterTable("user_skills")
    .dropColumn("description")
    .dropColumn("price")
    .execute();
}
