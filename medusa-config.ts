import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const isProduction = process.env.NODE_ENV === "production"

// Read the database URL without the ssl parameter
const databaseUrl = process.env.DATABASE_URL;

// Conditionally append '?ssl=true' based on the environment
const correctedDatabaseUrl = isProduction ? `${databaseUrl}?ssl=false` : databaseUrl;

module.exports = defineConfig({
  projectConfig: {
    // Use the corrected URL which includes the SSL parameter
    databaseUrl: correctedDatabaseUrl,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  }
})
