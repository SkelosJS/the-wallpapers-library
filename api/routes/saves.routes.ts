const publicRoot: string = process.cwd() + "../build";
import { Express, Request, Response } from "express";

// Controllers
import { saveImage } from "../controllers/saves.controller";

export default (app: Express): void => {
    app.route('/api/v1/image/save').post(saveImage);
}