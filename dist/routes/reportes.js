"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reporte_model_1 = require("../models/reporte.model");
const autenticacion_1 = require("./middlewares/autenticacion");
const reporteRoutes = express_1.Router();
// Obtener Reporte Páginado // antes del asyn va el verificaTokoen []
reporteRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // paginado (si no manda ninguna página por defecto aparecerá la 1)
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    // busqueda de todos los reportes creados
    const ReportesTotales = yield reporte_model_1.Reporte.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        pagina,
        ReportesTotales
    });
}));
// Crear Reporte
reporteRoutes.post('/', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    reporte_model_1.Reporte.create(body).then((reporteDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield reporteDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            reporte: reporteDB
        });
    })).catch(err => {
        res.json({
            ok: false,
            mensaje: 'Este abonado ya posee reporte',
            err,
        });
    });
});
// Obtener reporte por Abonado
reporteRoutes.get('/consulta/:abonadoID', (req, res) => {
    //[verificaToken] después del abonado
    const abonadoId = req.params.abonadoID;
    reporte_model_1.Reporte.findOne({ abonado: abonadoId }, (err, abonadoDB) => {
        if (err) {
            return res.json({
                ok: false,
                mensaje: 'Error en la petición, no existe abonado en la BD',
                err
            });
        }
        if (!abonadoDB) {
            res.json({
                ok: false,
                mensaje: 'El abonado no posee reporte'
            });
        }
        if (abonadoDB) {
            res.json({
                ok: true,
                Reporte: abonadoDB
            });
        }
        ;
    });
});
exports.default = reporteRoutes;
