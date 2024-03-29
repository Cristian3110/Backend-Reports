"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaToken = void 0;
const token_1 = __importDefault(require("../../classes/token"));
const verificaToken = (req, res, next) => {
    const userToken = req.get('x-token') || '';
    token_1.default.comprobarToken(userToken)
        .then((decoded) => {
        console.log('Decoded', decoded);
        req.usuario = decoded.usuario; // este usuario es el que viene del token.ts en el payload
        next();
    })
        .catch(err => {
        res.json({
            ok: false,
            mensaje: 'Token no es correcto'
        });
    });
};
exports.verificaToken = verificaToken;
