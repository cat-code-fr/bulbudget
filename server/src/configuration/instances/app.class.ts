import { Transform } from "class-transformer"
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator"

export default class AppEnv {

    @Transform(({ value }) => {
        if (value === "true" || value === true) return true
        if (value === "false" || value === false) return false
        throw new Error("Le protocole HTTPS doit être 'true' ou 'false'")
    })
    @IsBoolean({ message: "Le protocole HTTPS doit être un booléen" })
    @IsNotEmpty({ message: "Le protocole HTTPS est requis" })
    HTTPS: boolean

    @IsString({ message: "L'hôte de l'application doit être une chaîne de caractères" })
    @IsNotEmpty({ message: "L'hôte de l'application est requis" })
    HOST: string

    @Transform(({ value }) => Number(value))
    @IsNumber({}, { message: "Le port du client doit être un nombre" })
    @Min(1024, { message: "Le port du client doit être supérieur à 1024" })
    @Max(49151, { message: "Le port du client doit être inférieur à 49151" })
    @IsNotEmpty({ message: "Le port du client est requis" })
    CLIENT_PORT: number

    @Transform(({ value }) => Number(value))
    @IsNumber({}, { message: "Le port du serveur doit être un nombre" })
    @Min(1024, { message: "Le port du serveur doit être supérieur à 1024" })
    @Max(49151, { message: "Le port du serveur doit être inférieur à 49151" })
    @IsNotEmpty({ message: "Le port du serveur est requis" })
    SERVER_PORT: number

}