import { defineConfig } from "kysely-ctl";
import { db } from "../app/database";

export default defineConfig({
  kysely: db,
  migrations: {
    migrationFolder: "migrations",
  },
  seeds: {
    seedFolder: "seeds",
  },
});
