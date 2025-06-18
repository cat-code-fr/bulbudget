import * as dotenv from 'dotenv'
import { validateEnvs } from '../../src/configuration/env.config'

dotenv.config({ path: './server/.env' })

describe("Validation de la configuration de l'application", () => {

    const env = { ...process.env }

    beforeEach(() => {
        process.env = { ...env }
    })

    it("utilise la bonne configuration pour l'application", () => {
        expect(() => validateEnvs.app()).not.toThrow()
    })

    it("lève une erreur si la configuration est incomplète", () => {
        delete process.env.HOST
        expect(() => validateEnvs.app()).toThrow()
    })

    it("lève une erreur si la configuration est incorrecte", () => {
        process.env.CLIENT_PORT = 'not a number'
        expect(() => validateEnvs.app()).toThrow()
    })

})