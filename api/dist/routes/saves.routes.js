"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const publicRoot = process.cwd() + "../build";
// Controllers
const saves_controller_1 = require("../controllers/saves.controller");
exports.default = (app) => {
    app.route('/api/v1/image/save').post(saves_controller_1.saveImage);
};
