import Express from 'express';
import { consultaTodosUsuarios, crearUsuario, editarUsuario, eliminarUsuario, consultaUsuario } from '../../controllers/usuarios/controller.js';


const rutasUsuario = Express.Router();

//Respuesta generica despues de la consulta

const genericCallBack = (res) =>(err,result)=>{

    if(err){
     
      res.status(500).send(err);
    
    }else{

      res.json(result);

    }
};


// PARA LISTAR ELEMENTOS
rutasUsuario.route('/usuarios').get((req,res)=>{

  console.log('alguien hizo get en la ruta /productos');
  consultaTodosUsuarios(genericCallBack(res));

});



// PARA LISTAR UN ELEMENTO ESPECIFICO por id
rutasUsuario.route('/usuarios/:id').get((req,res)=>{

  console.log(req.params);

  console.log('alguien hizo get en la ruta /usuarios');
  consultaUsuario(req.params.id,genericCallBack(res));

});



//AGREGAR PRODUCTO

rutasUsuario.route('/usuarios/nuevo').post((req,res)=>{

  console.log('alguien hizo post en la ruta /usuarios/nuevo');
  crearUsuario(req.body, genericCallBack(res));  

});


//EDITAR

rutasUsuario.route('/usuarios/:id').patch((req, res) => {
  
  console.log('alguien hizo post en la ruta /usuarios/actualizar');
  console.log(req.body);
  editarUsuario(req.params.id, req.body, genericCallBack(res));

});


//ELIMINAR

rutasUsuario.route('/usuarios/:id').delete((req, res) => {

  console.log('alguien hizo delete  en la ruta /usuarios/eliminar');
  eliminarUsuario(req.params.id, genericCallBack(res));

});


export default rutasUsuario;
