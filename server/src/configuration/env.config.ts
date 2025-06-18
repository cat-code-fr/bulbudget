import 'reflect-metadata'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'

import AppEnv from './instances/app.class'
import DBEnv from './instances/db.class'
import SSLEnv from './instances/ssl.class'

dotenv.config()

function validateEnv<T extends object>(envClass: new () => T): T {

    const validatedConfig = plainToInstance(envClass, process.env)
    const errors = validateSync(validatedConfig, { whitelist: true })

    if (errors.length > 0) throw new Error(errors.map(error => Object.values(error.constraints || {})).join(', '))

    if (envClass === SSLEnv) {
        const config = validatedConfig as SSLEnv
        if (config.HTTPS === false) {
            if ('SSL_CERT' in process.env || 'SSL_KEY' in process.env) {
                throw new Error("Les variables SSL ne doivent pas être présentes lorsque HTTPS est désactivé")
            }
        } else {
            const certPath = path.resolve(__dirname, '../..', String(process.env.SSL_CERT))
            const keyPath = path.resolve(__dirname, '../..', String(process.env.SSL_KEY))
            if (!fs.existsSync(certPath)) throw new Error(`Le certificat SSL n'a pas été trouvé : ${certPath}`)
            if (!fs.existsSync(keyPath)) throw new Error(`La clé privée SSL n'a pas été trouvée : ${keyPath}`)
        }
    }
    
    return validatedConfig

}

export const validateEnvs = {
    app: () => validateEnv(AppEnv),
    db: () => validateEnv(DBEnv),
    ssl: () => validateEnv(SSLEnv)
}

export function validateAllEnvs() {
    return {
        app: validateEnv(AppEnv),
        db: validateEnv(DBEnv),
        ssl: validateEnv(SSLEnv)
    }
}