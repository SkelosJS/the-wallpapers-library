const publicRoot: string = process.cwd() + "../build";
import { Express, Request } from "express";

// Multer
import multer, { Multer, StorageEngine } from "multer";
const storage: StorageEngine = multer.diskStorage({
    destination: function(req: Request, file: Express.Multer.File, cb): void {
        cb(null, '../api/uploads')
    },
    filename: function(req: Request, file: Express.Multer.File, cb): void {
        cb(null, file.fieldname + '-' + file.originalname)
    }
});
const upload: Multer = multer({ storage });

// Controllers
import { getImage, saveImage } from "../controllers/saves.controller";

// Middlewares
import { checkMimeType } from "../middlewares/checkMimeType";

export default (app: Express): void => {
    app.route('/api/v1/image/save').post(upload.single('wallpaper'), checkMimeType("image/"), saveImage);
    app.route('/api/v1/image/get').get(getImage);
}