import { DB } from "@/app/database";
import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .createTable("skills")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("category", "text", (col) => col.notNull())
    .addColumn("skill", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`NOW()`),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`NOW()`),
    )
    .addUniqueConstraint("uniq__user_skills__category_skill", [
      "category",
      "skill",
    ])
    .execute();

  await db.schema
    .createTable("user_skills")
    .addColumn("user_id", "serial")
    .addColumn("skill_id", "serial")
    .addColumn("type", "text", (col) =>
      col.notNull().check(sql`type IN ('teach', 'learn')`),
    )
    .addColumn("created_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`NOW()`),
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.notNull().defaultTo(sql`NOW()`),
    )
    .addForeignKeyConstraint("fk__users__user_skills", ["user_id"], "users", [
      "id",
    ])
    .addForeignKeyConstraint(
      "fk__skills__user_skills",
      ["skill_id"],
      "skills",
      ["id"],
    )
    .execute();
}

export async function down(db: Kysely<DB>): Promise<void> {
  await db.schema.dropTable("user_skills").execute();
  await db.schema.dropTable("skills").execute();
}
