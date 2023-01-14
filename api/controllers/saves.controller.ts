import { Request, Response } from "express";
import dotenv from "dotenv"
dotenv.config();

/**
 * @param req Express request param
 * @param res Express response param
 * @returns Renvoie un JSON avec le path de l'image publié
 */
export const saveImage = (req: Request, res: Response) => {
    if(req.file) {
        return res.status(200).json({ success: true, path: `${process.env.API_URL}/image/get?img=wallpaper-${req.file.originalname}` });
    } else {
        return res.status(400).json({ success: false, message: "FILE_MISSING" });
    }
};

/**
 * Renvoie une image en fonction de son filename
 * @param req Express request param
 * @param res Express response param
 */
export const getImage = (req: Request, res: Response) => {
    type Options = {
        root: string,
        dotfiles: string,
        headers: {
            'x-timestamp': number,
            'x-sent': boolean
        }
    }

    let options: Options = {
        root: process.cwd() + "/uploads",
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    if(!req.query.img) {
        return res.status(400).json({ success: false, message: "MISSING_QUERY" });
    } else {   
        let fileName: string = req.query.img.toString();
    
        res.sendFile(fileName, options, (err) => {
            if(err) {
                res.status(400).json({ success: false, message: "ERR_GET_IMAGE" });
            }
        });
    }
}