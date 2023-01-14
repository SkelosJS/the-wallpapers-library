"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMimeType = void 0;
const fs_1 = __importDefault(require("fs"));
/**
 * Fonction permettant de vérifier si un fichier est détecté et si le mimetype du fichier publié est celui que le serveur exige
 * @param wantedMimeType String (ex. "image/")
 * @returns Renvoie la fonction suivante si la condition n'est pas vérifiée, et renvoie une réponse JSON avec un message d'erreur mimetype si la condition est vérifiée
 * @returns Renvoie un message d'erreur si il n'y a aucun fichier détecté
 */
const checkMimeType = (wantedMimeType) => {
    return (req, res, next) => {
        var _a, _b;
        if (req.file) {
            if (!((_a = req.file) === null || _a === void 0 ? void 0 : _a.mimetype.startsWith(wantedMimeType))) {
                fs_1.default.unlink(`${process.cwd() + "/uploads"}/wallpaper-${(_b = req.file) === null || _b === void 0 ? void 0 : _b.originalname}`, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                return res.status(400).json({ success: false, message: "ERR_MIMETYPE" });
            }
            else {
                next();
            }
        }
        else {
            return res.status(400).json({ success: false, message: "FILE_MISSING" });
        }
    };
};
exports.checkMimeType = checkMimeType;
