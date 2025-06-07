import * as dotenv from 'dotenv'
import { validateEnvs } from '../../src/configuration/env.config'

dotenv.config({ path: './server/.env' })

describe("Validation de la configuration de la base de données", () => {

    const env = { ...process.env }

    beforeEach(() => {
        process.env = { ...env }
    })

    it("utilise la bonne configuration pour la base de données", () => {
        expect(() => validateEnvs.db()).not.toThrow()
    })

    it("lève une erreur si la configuration est incomplète", () => {
        delete process.env.DB_USER
        expect(() => validateEnvs.db()).toThrow()
    })

    it("lève une erreur si la configuration est incorrecte", () => {
        process.env.DB_PORT = 'not a number'
        expect(() => validateEnvs.db()).toThrow()
    })
    
})