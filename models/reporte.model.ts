
import {Schema, Document, model} from 'mongoose';


const reporteSquema = new Schema({

       created: {
        type: Date
       },
       nombre:{
        type: String,
        required: [true, 'el nombre es necesario']
       },
       abonado:{
        type: Number,
        unique: true, // sin duplicado 
       },
       email:{
        type: String,
        required: 'El correo es necesario'
       },
       tlfContacto:{
        type: Number,
        required: 'El número de contacto es necesario'
       },
       falla:{
        type: String,
        required: 'La falla es necesaria'
       },
       tipoFalla:{
        type: String,
        required: 'El tipo de falla en necesaria'
       },
       usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe existir una referencia a un usuario']
       }

});


reporteSquema.pre<IReporte>('save', function( next){
      
     this.created = new Date();
     next();
});

interface IReporte extends Document{
      created: Date;
      nombre: string;
      abonado: number;
      email: string;
      tlfContacto: number;
      falla: string;
      tipoFalla: string;
      usuario: string;

}

export const Reporte = model<IReporte>('Reporte', reporteSquema);