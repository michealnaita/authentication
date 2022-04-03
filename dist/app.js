"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module Dependencies
 */
const express_1 = __importDefault(require("express"));
const sessionAuth_1 = __importDefault(require("./sessionAuth"));
const express_handlebars_1 = require("express-handlebars");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// view engine
app.engine('.hbs', (0, express_handlebars_1.engine)({
    extname: '.hbs',
}));
app.set('view engine', '.hbs');
app.set('views', path_1.default.join(__dirname, '/../', 'views'));
// serving static assets
app.use('/public', express_1.default.static(path_1.default.join(__dirname, '/../', 'public')));
// route controllers
app.get('/', (req, res) => {
    res.render('index');
});
app.use('/session', sessionAuth_1.default);
// error handling
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500);
    res.send('something went wrong');
});
// spin server
app.listen(3000, () => {
    console.log('server running on port 3000');
});
