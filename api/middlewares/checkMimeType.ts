import { Request, Response, NextFunction } from "express";
import fs from "fs";

/**
 * Fonction permettant de vérifier si un fichier est détecté et si le mimetype du fichier publié est celui que le serveur exige
 * @param wantedMimeType String (ex. "image/")
 * @returns Renvoie la fonction suivante si la condition n'est pas vérifiée, et renvoie une réponse JSON avec un message d'erreur mimetype si la condition est vérifiée
 * @returns Renvoie un message d'erreur si il n'y a aucun fichier détecté
 */
export const checkMimeType = (wantedMimeType: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(req.file) {
            if(!req.file?.mimetype.startsWith(wantedMimeType)) {
                fs.unlink(`${process.cwd() + "/uploads"}/wallpaper-${req.file?.originalname}`, (err) => {
                    if(err) {
                        console.log(err);
                    }
                });
    
                return res.status(400).json({ success: false, message: "ERR_MIMETYPE" });
            } else {
                next();
            }
        } else {
            return res.status(400).json({ success: false, message: "FILE_MISSING" });
        }
    }
}