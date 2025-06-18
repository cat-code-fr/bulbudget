import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export default class SSLEnv {

    @Transform(({ value }) => {
        if (value === "true" || value === true) return true
        if (value === "false" || value === false) return false
        throw new Error("Le protocole HTTPS doit être 'true' ou 'false'")
    })
    @IsBoolean({ message: "Le protocole HTTPS doit être un booléen" })
    @IsNotEmpty({ message: "Le protocole HTTPS est requis" })
    HTTPS: boolean

    @ValidateIf(o => o.HTTPS === true)
    @IsString({ message: "Le chemin du certificat SSL doit être une chaîne de caractères" })
    @IsNotEmpty({ message: "Le chemin du certificat SSL est requis" })
    SSL_CERT: string

    @ValidateIf(o => o.HTTPS === true)
    @IsString({ message: "Le chemin de la clé privée SSL doit être une chaîne de caractères" })
    @IsNotEmpty({ message: "Le chemin de la clé privée SSL est requis" })
    SSL_KEY: string

    
    
}