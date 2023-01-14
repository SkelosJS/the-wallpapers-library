"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = exports.saveImage = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * @param req Express request param
 * @param res Express response param
 * @returns Renvoie un JSON avec le path de l'image publié
 */
const saveImage = (req, res) => {
    if (req.file) {
        return res.status(200).json({ success: true, path: `${process.env.API_URL}/image/get?img=wallpaper-${req.file.originalname}` });
    }
    else {
        return res.status(400).json({ success: false, message: "FILE_MISSING" });
    }
};
exports.saveImage = saveImage;
/**
 * Renvoie une image en fonction de son filename
 * @param req Express request param
 * @param res Express response param
 */
const getImage = (req, res) => {
    let options = {
        root: process.cwd() + "/uploads",
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    if (!req.query.img) {
        return res.status(400).json({ success: false, message: "MISSING_QUERY" });
    }
    else {
        let fileName = req.query.img.toString();
        res.sendFile(fileName, options, (err) => {
            if (err) {
                res.status(400).json({ success: false, message: "ERR_GET_IMAGE" });
            }
        });
    }
};
exports.getImage = getImage;
