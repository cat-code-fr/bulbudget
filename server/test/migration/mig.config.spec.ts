import { DataSource } from "typeorm"
import migConfig from "../../src/configuration/mig.config"
import { existsSync } from "fs"

describe("Configuration de la migration", () => {

    it("doit être une instance de DataSource", () => {
        expect(migConfig).toBeInstanceOf(DataSource)
    })

    it("doit contenir le chemin des migrations", () => {
        expect(migConfig.options.migrations).toBeDefined()
        expect(Array.isArray(migConfig.options.migrations)).toBe(true)
        expect(migConfig.options.migrations?.[0]).toContain("/migrations/")
    })

    it("le dossier \"migrations\" doit exister", () => {

        const migrationsPath = migConfig.options.migrations?.[0]
        const dir = migrationsPath?.replace(/\/\*.*$/, "")
        
        expect(existsSync(dir)).toBe(true)

    })

})