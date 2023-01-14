import { Express, Request, Response } from "express";

export const saveImage = (req: Request, res: Response): void => {
    res.json({ success: true });
};