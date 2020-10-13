import Server from './classes/server';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import userRoutes from './routes/usuarios';
import reporteRoutes from './routes/reportes';

const server = new Server();


// Body parser
server.app.use(bodyParser.urlencoded({ extended: true}));
server.app.use(bodyParser.json() );

// Rutas de mi aplicación
server.app.use( '/user', userRoutes );
server.app.use( '/reportes', reporteRoutes );


// Conectar Base de Datos
// Cuando no es creada la BD directamente de aquí la crea automáticamente
mongoose.connect('mongodb://localhost:27017/cantvAverias',
     { useNewUrlParser: true, useCreateIndex: true}, (err)=>{

      if (err) throw err;

      console.log('Base de Datos ONLINE') 
     })

// Levantando express
server.start(()=>{
 console.log(`Servidor corriendo en el puerto ${server.port}`);
});