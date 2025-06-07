import migConfig from "../../src/configuration/mig.config"

describe("Exécution des migrations (mock)", () => {

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it("doit exécuter les migrations sans erreur", async () => {

        const migration = jest.spyOn(migConfig, 'runMigrations').mockResolvedValue([])

        await expect(migConfig.runMigrations()).resolves.toEqual([])
        expect(migration).toHaveBeenCalled()

    })

    it("Lève une erreur si l'exécution échoue", async () => {

        const migration = jest.spyOn(migConfig, 'runMigrations').mockRejectedValue(new Error("Migration failed"))

        await expect(migConfig.runMigrations()).rejects.toThrow("Migration failed")
        expect(migration).toHaveBeenCalled()

    })

})