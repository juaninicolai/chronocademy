import { DB } from "@/app/database";
import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .alterTable("user_data")
    .addColumn("tsv", sql`tsvector`, (col) =>
      col
        .generatedAlwaysAs(
          sql`
            setweight(to_tsvector('english', first_name || ' ' || last_name), 'A') ||
            setweight(to_tsvector('english', description), 'B')
          `,
        )
        .stored(),
    )
    .execute();

  await sql`
    CREATE FUNCTION update_user_data_tsv() RETURNS TRIGGER AS $$
    BEGIN
      NEW.tsv :=
        setweight(to_tsvector('english', NEW.first_name || ' ' || NEW.last_name), 'A') ||
        setweight(to_tsvector('english', NEW.description), 'B');
      RETURN NEW;
    END
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER user_data_tsv_trigger
    BEFORE UPDATE ON user_data
    FOR EACH ROW EXECUTE FUNCTION update_user_data_tsv();
  `.execute(db);
}

export async function down(db: Kysely<DB>): Promise<void> {
  await sql`
    DROP TRIGGER user_data_tsv_trigger ON user_data;
    DROP FUNCTION update_user_data_tsv();
  `.execute(db);

  await db.schema.alterTable("user_data").dropColumn("tsv").execute();
}
