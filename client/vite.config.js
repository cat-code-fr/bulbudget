import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { validateEnvs } from '../server/src/configuration/env.config'

dotenv.config({ path: '../server/.env' })

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: validateEnvs.ssl().HTTPS ? {
      key: fs.readFileSync(path.resolve(__dirname, '../server', validateEnvs.ssl().SSL_KEY)),
      cert: fs.readFileSync(path.resolve(__dirname, '../server', validateEnvs.ssl().SSL_CERT))
    } : false
  },
  plugins: [react()],
})
