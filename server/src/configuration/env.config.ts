import 'reflect-metadata'

import * as dotenv from 'dotenv'
import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import DBEnv from './instances/db.class'

dotenv.config()

function validateEnv<T extends object>(envClass: new () => T): T {

    const validatedConfig = plainToInstance(envClass, process.env)
    const errors = validateSync(validatedConfig, { whitelist: true })

    if (errors.length > 0) throw new Error(errors.map(error => Object.values(error.constraints || {})).join(', '))
    return validatedConfig

}

export const validateEnvs = {
    db: () => validateEnv(DBEnv)
}

export function validateAllEnvs() {
    return {
        db: validateEnv(DBEnv)
    }
}