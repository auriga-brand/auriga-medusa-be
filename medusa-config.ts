import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// We will use the existing DATABASE_URL from the environment.
const databaseUrl = process.env.DATABASE_URL;

// The trick is to directly pass an SSL configuration to the pg client
// via the `extra` property on the database configuration.
// This is the correct way to configure this in Medusa's newer versions.
const databaseConfig = {
  // We explicitly set ssl to false.
  ssl: false
};

module.exports = defineConfig({
  projectConfig: {
    // Provide the URL as usual.
    databaseUrl,
    // Pass the SSL config as the `extra` property.
    // The previous error was a red herring related to how this object was structured.
    // This structure should work with Medusa's TypeORM setup.
    extra: process.env.NODE_ENV === 'production' ? databaseConfig : undefined,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
});
