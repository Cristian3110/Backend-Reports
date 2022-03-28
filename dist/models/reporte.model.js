"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reporte = void 0;
const mongoose_1 = require("mongoose");
const reporteSquema = new mongoose_1.Schema({
    created: {
        type: String,
    },
    nombre: {
        type: String,
        required: [true, 'el nombre es necesario'],
    },
    abonado: {
        type: Number,
        unique: true, // sin duplicado
    },
    email: {
        type: String,
        required: 'El correo es necesario',
    },
    tlfContacto: {
        type: Number,
        required: 'El número de contacto es necesario',
    },
    falla: {
        type: String,
        required: 'La falla es necesaria',
    },
    tipoFalla: {
        type: String,
        required: 'El tipo de falla en necesaria',
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe existir una referencia a un usuario'],
    },
});
reporteSquema.pre('save', function (next) {
    let fechaActual = new Date();
    let fecha = `${fechaActual.getDate()}/${fechaActual.getMonth()}/${fechaActual.getFullYear()} - ${fechaActual.getHours()}:${fechaActual.getMinutes()}`;
    this.created = fecha;
    // this.created = new Date();
    next();
});
exports.Reporte = (0, mongoose_1.model)('Reportes', reporteSquema);
