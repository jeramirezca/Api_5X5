//hacer el import express
//const express = require('express');
//hacer el nuevo tipo de import
import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/db.js';
import rutasProducto from './views/productos/rutas.js';
import rutasUsuario from './views/usuarios/rutas.js';
import rutasVenta from './views/ventas/rutas.js';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';



dotenv.config({path: './.env'});


const app = Express();

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://misiontic-prueba.us.auth0.com/.well-known/jwks.json'
}),
audience: 'api-autenticacion-prueba-mintic',
issuer: 'https://misiontic-prueba.us.auth0.com/',
algorithms: ['RS256']
});




app.use(jwtCheck);
app.use(Express.json());
app.use(Cors());
app.use(rutasProducto);
app.use(rutasUsuario);
app.use(rutasVenta);



const main = ()=>{

  return app.listen(process.env.PORT, ()=>{

    console.log(`escuchando puerto ${process.env.PORT}`);

  }); 

};

connectDB(main);