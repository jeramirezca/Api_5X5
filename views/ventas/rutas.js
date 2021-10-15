import Express from 'express';
import { consultaTodosVentas, crearVenta, editarVenta, eliminarVenta, consultarVenta} from '../../controllers/ventas/controller.js';


const rutasVenta = Express.Router();

//Respuesta generica despues de la consulta

const genericCallBack = (res) =>(err,result)=>{
    if(err){
     
      res.status(500).send(err);
    
    }else{
      res.json(result);
    }
};

// PARA LISTAR ELEMENTOS
rutasVenta.route('/ventas/').get((req,res)=>{

  console.log('alguien hizo get en la ruta /ventas');
  consultaTodosVentas(genericCallBack(res));

});


// PARA LISTAR UN ELEMENTO ESPECIFICO por id
rutasVenta.route('/ventas/:id/').get((req,res)=>{

  console.log(req.params);
  console.log('alguien hizo get en la ruta /ventas/id');
  consultarVenta(req.params.id,genericCallBack(res));

});



//AGREGAR VENTA

rutasVenta.route('/ventas/nuevo/').post((req,res)=>{

  console.log('alguien hizo post en la ruta /ventas/nuevo');
  crearVenta(req.body, genericCallBack(res));  

});


//EDITAR

rutasVenta.route('/ventas/:id').patch((req, res) => {
  
  console.log('alguien hizo post en la ruta /ventas/actualizar');
  editarVenta(req.params.id, req.body, genericCallBack(res));

});


//ELIMINAR

rutasVenta.route('/ventas/:id/').delete((req, res) => {

  console.log('alguien hizo delete  en la ruta /ventas/eliminar');
  eliminarVenta(req.params.id, genericCallBack(res));

});


export default rutasVenta;

