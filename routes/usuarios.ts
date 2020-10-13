

// Definiendo las rutas que tengan que ver con el usuario

import { Router, Request, Response } from "express";
import { Usuario } from "../models/usuario.model";
import bycrypt from 'bcrypt';
import token from "../classes/token";
import { verificaToken } from "./middlewares/autenticacion";

const userRoutes = Router();





// LOGIN DEL USUARIO

userRoutes.post('/login', (req: Request, res: Response)=>{

 const body = req.body;

 Usuario.findOne({ email: body.email}, (err, userDB)=>{

  if (err) throw err;

  if(!userDB){
   return res.json({
    ok: false,
    mensaje: 'usuario/contraseña no son correctos'
   });
  }

  if (userDB.compararPassword(body.password)){

     const tokenUser = token.getJwtToken({
          _id: userDB._id,
          nombre: userDB.nombre,
          email: userDB.email
     })

       res.json({
       ok: true,
       token: tokenUser
   });

  }else{
   return res.json({
    ok: false,
    mensaje: 'usuario/contraseña no son correctos ****'
   });

  }



 })


})





// CREAR UN USUARIO

userRoutes.post('/create', ( req: Request, res: Response) =>{


     const user = {
      nombre: req.body.nombre,  // datos recibidos
      email: req.body.email,
      password: bycrypt.hashSync(req.body.password, 10)
     };

// grabando en DB

     Usuario.create(user).then( userDB =>{

          const tokenUser = token.getJwtToken({
               _id: userDB._id,
               nombre: userDB.nombre,
               email: userDB.email
          })
     
            res.json({
            ok: true,
            token: tokenUser
        });

     }).catch( err =>{
         res.json({
          ok:false,
          err
         });
     });



});


// Actualizar usuario

userRoutes.post('/update', verificaToken, ( req: any, res: Response) =>{

     // Los datos que se quieren actualizar
     // propiedades q se mandan en la petición post para actualizar

     const user = {
          nombre: req.body.nombre || req.usuario.nombre,
          email: req.body.email || req.usuario.email
     }

      // instrucción de mongoose para actualizar en BD

      Usuario.findByIdAndUpdate( req.usuario._id, user, { new: true }, (err, userDB) =>{

          if(err) throw err;

          if(!userDB){
               return res.json({
                    ok: false,
                    mensaje: 'No existe un usuario con ese ID'
               });
          }

          const tokenUser = token.getJwtToken({
               _id: userDB._id,
               nombre: userDB.nombre,
               email: userDB.email
          })
     
            res.json({
            ok: true,
            token: tokenUser
        });

       
      });

          // res.json({
          //      ok: true,
          //      usuario: req.usuario
          // })

});



// Obtener o retornar la información del usuario

userRoutes.get('/', [verificaToken], (req:any, res: Response)=>{

        const usuario = req.usuario;  

        res.json({
             ok: true,
             usuario
        })
});


export default userRoutes;