import * as dotenv from 'dotenv'
import * as fs from 'fs'
import { validateEnvs } from '../../src/configuration/env.config'

dotenv.config({ path: './server/.env' })

describe("Validation de la configuration du protocole de connexion", () => {

    const env = { ...process.env }

    beforeEach(() => {
        process.env = { ...env }
    })

    it("utilise la bonne configuration pour le protocole de connexion", () => {
        expect(() => validateEnvs.ssl()).not.toThrow()
    })

    it("lève une erreur si la configuration est incomplète", () => {
        process.env.HTTPS = 'true'
        delete process.env.SSL_CERT
        expect(() => validateEnvs.ssl()).toThrow()
        process.env.HTTPS = 'false'
        expect(() => validateEnvs.ssl()).toThrow()
    })

    it("lève une erreur si la configuration est incorrecte", () => {
        process.env.HTTPS = 'true'
        process.env.SSL_KEY = './ssl.key'
        expect(() => validateEnvs.ssl()).toThrow()
    })

})