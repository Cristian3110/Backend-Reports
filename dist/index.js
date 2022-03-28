"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const reportes_1 = __importDefault(require("./routes/reportes"));
const server = new server_1.default();
// Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// configuración del CORDS
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
// Rutas de mi aplicación
server.app.use('/user', usuarios_1.default);
server.app.use('/reportes', reportes_1.default);
// Conectar Base de Datos
// Cuando no es creada la BD directamente de aquí la crea automáticamente
mongoose_1.default.connect('mongodb://localhost:27017/cantvAverias', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err)
        throw err;
    console.log('Base de Datos ONLINE');
});
// Levantando express
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
