"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const ejs_1 = __importDefault(require("ejs"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// chemin d'accès vers le dossier build => "build du front end"
const publicRoot = process.cwd() + "/build";
app.use(express_1.default.static(publicRoot));
app.engine('html', ejs_1.default.renderFile);
app.set('view engine', 'html');
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
app.use((0, cors_1.default)({ origin: ['http://localhost:3000'], credentials: true, exposedHeaders: ['set-cookie'] }));
// Routers
const saves_routes_1 = __importDefault(require("./routes/saves.routes"));
(0, saves_routes_1.default)(app);
app.get('/', (req, res) => {
    res.json({ ok: true });
});
app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
