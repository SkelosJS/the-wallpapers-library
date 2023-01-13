const publicRoot = process.cwd() + "/build";

// Controllers
const saveController = require('../controllers/saves.controller');

module.exports = (app) => {
    app.route('/api/v1/image/save').post(saveController.saveImage);
}