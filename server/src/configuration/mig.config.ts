import { DataSource } from "typeorm";
import { dbOptions } from "./db.config";

export default new DataSource({
    ...dbOptions,
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}']
})