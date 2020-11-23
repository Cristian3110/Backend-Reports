import { Router, Response } from "express";
import { Reporte } from '../models/reporte.model';
import { verificaToken } from './middlewares/autenticacion';



const reporteRoutes = Router();

// Obtener Reporte Páginado // antes del asyn va el verificaTokoen []
reporteRoutes.get('/', async (req: any, res: Response) =>{

  // paginado (si no manda ninguna página por defecto aparecerá la 1)
       let pagina = Number(req.query.pagina) || 1;
       let skip = pagina - 1;
       skip = skip *10;

       // busqueda de todos los reportes creados
       const ReportesTotales = await Reporte.find()
                                     .sort({_id:-1})
                                     .skip( skip )
                                     .limit(10)
                                     .populate('usuario','-password')
                                     .exec() 

       res.json({
        ok: true,
        pagina,
        ReportesTotales
       })
});




// Crear Reporte

reporteRoutes.post('/', [verificaToken], (req: any, res: Response) =>{


    const body = req.body;
    body.usuario = req.usuario._id;

    Reporte.create(body).then( async reporteDB =>{

         await reporteDB.populate('usuario', '-password').execPopulate();
     
         res.json({
          ok: true,
          reporte: reporteDB
         });

    }).catch (err => {
       res.json({
            ok:false,
            mensaje: 'Este abonado ya posee reporte',
            err,
       })
    });

});


// Obtener reporte por Abonado

reporteRoutes.get('/consulta/:abonadoID', (req: any, res: Response) =>{            
          
     //[verificaToken] después del abonado
     
          const abonadoId = req.params.abonadoID;

           Reporte.findOne({abonado: abonadoId}, (err, abonadoDB) => {
                if (err){
                         return res.json({
                          ok:false,
                          mensaje: 'Error en la petición, no existe abonado en la BD',
                          err 
                     });
                } 
                
                if(!abonadoDB){
                          res.json({
                          ok:false,
                          mensaje: 'El abonado no posee reporte'
                     })
                }
                
                if(abonadoDB){
                         res.json({
                         ok: true,
                         Reporte: abonadoDB                    
                    })
                };         
                
           });    
   });



export default reporteRoutes;