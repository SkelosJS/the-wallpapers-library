import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import ejs from "ejs";

const app: Express = express();
dotenv.config();

// chemin d'accès vers le dossier build => "build du front end"
const publicRoot: string = process.cwd() + "/build";

app.use(express.static(publicRoot));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({ origin: ['http://localhost:3000'], credentials: true, exposedHeaders: ['set-cookie']}));

// Routers
import savesRoutes from "./routes/saves.routes";

savesRoutes(app);

app.get('/', (req: Request, res: Response): void => {
    res.json({ ok: true });
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});