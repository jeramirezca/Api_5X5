import Express from 'express';
import { consultaTodosProductos, crearProducto, editarProducto, eliminarProducto, consultarProducto, verificarEstado} from '../../controllers/productos/controller.js';


const rutasProducto = Express.Router();

//Respuesta generica despues de la consulta

const genericCallBack = (res) =>(err,result)=>{
    if(err){
     
      res.status(500).send(err);
    
    }else{
      res.json(result);
    }
};


// PARA LISTAR ELEMENTOS
rutasProducto.route('/productos').get((req,res)=>{

  console.log('alguien hizo get en la ruta /productos');
  consultaTodosProductos(genericCallBack(res));

});



// PARA LISTAR UN ELEMENTO ESPECIFICO por id
rutasProducto.route('/productos/:id').get((req,res)=>{

  console.log(req.params);

  console.log('alguien hizo get en la ruta /productos');
  consultarProducto(req.params.id,genericCallBack(res));

});



//AGREGAR PRODUCTO

rutasProducto.route('/productos/verificar').get((req,res)=>{

  console.log("req");
  console.log('alguien hizo post en la ruta /productos/verificar');
  // verificarEstado(req.body, genericCallBack(res)); 

});

rutasProducto.route('/productos/nuevo').post((req,res)=>{

  console.log('alguien hizo post en la ruta /productos/nuevo');
  crearProducto(req.body, genericCallBack(res));  

});




//EDITAR

rutasProducto.route('/productos/:id').patch((req, res) => {
  
  console.log('alguien hizo post en la ruta /productos/actualizar');
  editarProducto(req.params.id, req.body, genericCallBack(res));

});


//ELIMINAR

rutasProducto.route('/productos/:id').delete((req, res) => {

  console.log('alguien hizo delete  en la ruta /productos/eliminar');
  eliminarProducto(req.params.id, genericCallBack(res));

});


export default rutasProducto;
