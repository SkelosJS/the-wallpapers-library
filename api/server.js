const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// chemin d'accès vers le dossier build
const publicRoot = process.cwd() + "/build";

app.use(express.static(publicRoot));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({ origin: ['http://localhost:3000'], credentials: true, exposedHeaders: ['set-cookie'] }));

// Routers
const savesRouter = require('./routes/saves.routes');

savesRouter(app);

app.get('/', (req, res) => {
    res.json({ ok: true });
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Listening on port ' + process.env.PORT);
});