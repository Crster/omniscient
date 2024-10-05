const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env");
}

export const appConfig = {
  database: {
    url: DATABASE_URL,
  },
};
