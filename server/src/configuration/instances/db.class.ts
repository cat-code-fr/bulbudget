import { Transform } from "class-transformer";
import { IsIn, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export default class DBEnv {

    @IsString({ message: "Le type de la base de données doit être une chaîne de caractères" })
    @IsNotEmpty({ message: "Le type de la base de données est requis" })
    @IsIn([ 'mysql', 'postgres', 'sqlite', 'mariadb', 'mongodb', 'oracle', 'mssql', 'cordova', 'nativescript', 'react-native', 'sqljs', 'expo', 'better-sqlite3' ], { message: "Le type de la base de données n'est pas supporté" })
    DB_TYPE: MysqlConnectionOptions['type']

    @IsString({ message: "L'hôte de la base de données doit être une chaîne de caractères" })
    @IsNotEmpty({ message: "L'hôte de la base de données est requis" })
    HOST: string

    @Transform(({ value }) => Number(value))
    @IsNumber({}, { message: "Le port de la base de données doit être un nombre" })
    @Min(1024, { message: "Le port de la base de données doit être supérieur à 1024" })
    @Max(49151, { message: "Le port de la base de données doit être inférieur à 49151" })
    @IsNotEmpty({ message: "Le port de la base de données est requis" })
    DB_PORT: number

    @IsString({ message: "Le nom d'utilisateur de la base de données doit être une chaîne de caractères" })
    @IsNotEmpty({ message: "Le nom de l'utilisateur de la base de données est requis" })
    DB_USER: string

    @IsString({ message: "Le mot de passe de la base de données doit être une chaîne de caractères" })
    @IsNotEmpty({ message: "Le mot de passe de la base de données est requis" })
    DB_PASSWORD: string

    @IsString({ message: "Le nom de la base de données doit être une chaîne de caractères" })
    @IsNotEmpty({ message: "Le nom de la base de données est requis" })
    DB_NAME: string

}