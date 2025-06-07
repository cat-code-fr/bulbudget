import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { validateEnvs } from "./env.config";

const env = validateEnvs.db()

export const dbOptions: MysqlConnectionOptions = {
    type: env.DB_TYPE,
    host: env.HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false
}