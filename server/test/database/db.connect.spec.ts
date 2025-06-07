import { DataSource } from "typeorm"
import { dbOptions } from "../../src/configuration/db.config"

describe("Connexion à la base de données", () => {

    let dataSource: DataSource

    beforeEach(() => {
        dataSource = new DataSource(dbOptions)
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it("se connecte à la base de données (mock)", async () => {

        const initializeMock = jest.fn().mockResolvedValue(undefined)
        jest.spyOn(DataSource.prototype, "initialize").mockImplementation(initializeMock)

        await expect(dataSource.initialize()).resolves.toBeUndefined()
        expect(initializeMock).toHaveBeenCalled()

    })

    it("lève une erreur si la connexion échoue", async () => {

        const initializeMock = jest.fn().mockRejectedValue(new Error("Connection failed"))
        jest.spyOn(DataSource.prototype, "initialize").mockImplementation(initializeMock)

        await expect(dataSource.initialize()).rejects.toThrow("Connection failed")
        expect(initializeMock).toHaveBeenCalled()

    })

})