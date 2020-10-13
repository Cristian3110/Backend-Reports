


import {Schema, model, Document} from 'mongoose';
import bycrypt from 'bcrypt';

const usuarioSchema= new Schema({
       
     nombre:{
       type: String,
       required: [true, 'el nombre es necesario']
     },
     email:{
      type: String,
      unique: true, // único sin duplicado
      required: [true, 'El correo es necesario']
     },
     password: {
      type: String,
      required: [true, 'La contraseña es necesaria']
     }

})

usuarioSchema.method('compararPassword', function(password: string = ''): boolean{
   if(bycrypt.compareSync(password, this.password)){
    return true;
   } else {
    return false;
   }
});



interface IUsuario extends Document{
   nombre: string;
   email: string;
   password: string;

   compararPassword(password: string): boolean;
}

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);