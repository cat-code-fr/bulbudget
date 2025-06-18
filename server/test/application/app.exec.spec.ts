process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

import * as request from 'supertest'
import * as fs from 'fs'
import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { App } from 'supertest/types'

import { AppModule } from "../../src/app/app.module"
import { validateAllEnvs } from "../../src/configuration/env.config"

const env = validateAllEnvs()

describe("Exécution de l'application", () => {

    let app: INestApplication<App>

    beforeEach(async () => {

        const fixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        const httpsOptions = env.ssl.HTTPS ? { httpsOptions: { cert: fs.readFileSync(env.ssl.SSL_CERT), key: fs.readFileSync(env.ssl.SSL_KEY) } } : undefined
        app = fixture.createNestApplication(httpsOptions)
        await app.init()

    })

    afterEach(async () => {
        await app.close()
    })

    it("doit exécuter l'application sans erreur", async () => {
        await app.listen(env.app.SERVER_PORT)
        const url = (await app.getUrl()).replace('[::1]', 'localhost')
        expect(url).toEqual(`${env.app.HTTPS ? 'https' : 'http'}://${env.app.HOST}:${env.app.SERVER_PORT}`)
    })

    it("doit exécuter une requête GET /", async () => {
        const res = await request(app.getHttpServer()).get('/')
        expect(res.status).toBe(200)
        expect(res.text).toEqual('Hello World!')
    })

    it("doit retourner 404 pour une route inexistante", async () => {
        const res = await request(app.getHttpServer()).get('/unvalid')
        expect(res.status).toBe(404)
    })
    
})
