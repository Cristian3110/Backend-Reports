"use strict";
// Definiendo las rutas que tengan que ver con el usuario
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../../models/usuario.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRoutes = express_1.Router();
// LOGIN DEL USUARIO
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'usuario/contraseña no son correctos'
            });
        }
        if (userDB.compararPassword(body.password)) {
            res.json({
                ok: true,
                token: 'gdf6b1d6fb541sd65b1s6'
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'usuario/contraseña no son correctos ****'
            });
        }
    });
});
// CREAR UN USUARIO
userRoutes.post('/create', (req, res) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10)
    };
    // grabando en DB
    usuario_model_1.Usuario.create(user).then(userDB => {
        res.json({
            ok: true,
            user: userDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
exports.default = userRoutes;
