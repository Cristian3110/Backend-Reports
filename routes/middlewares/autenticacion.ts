
import { Response, Request, NextFunction} from 'express';
import token from '../../classes/token';


export const verificaToken = (req: any, res: Response, next: NextFunction) => {

   const userToken = req.get('x-token') || '';

   token.comprobarToken(userToken)
      .then ( (decoded: any) =>{
        console.log('Decoded', decoded);
        req.usuario = decoded.usuario; // este usuerio es el que viene del token.ts en el payload
        next();
      })
      .catch(err => {

       res.json({
        ok:false,
        mensaje: 'Token no es correcto'
       });
      });

};