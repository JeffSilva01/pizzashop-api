import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: "postgresql://docker:docker@localhost:5432/pizzashop",
  }
} satisfies Config;
