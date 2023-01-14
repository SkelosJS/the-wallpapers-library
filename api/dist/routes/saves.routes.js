"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const publicRoot = process.cwd() + "../build";
// Multer
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../api/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage });
// Controllers
const saves_controller_1 = require("../controllers/saves.controller");
// Middlewares
const checkMimeType_1 = require("../middlewares/checkMimeType");
exports.default = (app) => {
    app.route('/api/v1/image/save').post(upload.single('wallpaper'), (0, checkMimeType_1.checkMimeType)("image/"), saves_controller_1.saveImage);
    app.route('/api/v1/image/get').get(saves_controller_1.getImage);
};
