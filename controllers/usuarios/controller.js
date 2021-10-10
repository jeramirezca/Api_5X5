
import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';


//consulta el listado de los usuarios

const consultaTodosUsuarios = async (callback)=>{

    const connection = getDB();
    await connection.collection('usuarios').find().limit(50).toArray(callback);
      
};


// consulta un usuario especifico por id

const consultaUsuario =async(id,callback) =>{

  const connection = getDB();
  await connection.collection('usuarios').findOne({ _id: new ObjectId(id)},callback);

};



// crea un nuevo Producto

const crearUsuario = async (datosUsuario, callback)=>{

  
  console.log('Llaves: ', Object.keys(datosUsuario));

      if (
          Object.keys(datosUsuario).includes('usuario') &&
          Object.keys(datosUsuario).includes('rol') &&
          Object.keys(datosUsuario).includes('estado')
        ) {
          // implementar código para crear vehículo en la BD
          const connection = getDB();
          console.log(datosUsuario.usuario);
          const ss =  { usuario: datosUsuario.usuario};
          console.log(ss);

          const resultado = await connection.collection('usuarios').findOne(ss);

          if(resultado){

              //No se como se desarrolla      
            
          }else{

            await connection.collection('usuarios').insertOne(datosUsuario, callback);

          }         
          
        } else {
          return { err: 'Error en consulta de datos', result: "Hola" };
        }
};


//editar un usuario

const editarUsuario =async (id,edicion, callback)=>{

  
  const filtroProducto = { _id: new ObjectId(id) };
  console.log("aqui,",id);
  console.log(filtroProducto);
  const operacion = {
    $set: edicion,
  };
  const connection = getDB();
 
  await connection.collection('usuarios').findOneAndUpdate(filtroProducto,operacion, { upsert: true, returnOriginal: true },callback);

};




//elminar un usuario

const eliminarUsuario = async (id, callback)=>{

    const filtroUsuario = { _id: new ObjectId(id) };
    
    const connection = getDB();
    await connection.collection('usuarios').deleteOne(filtroUsuario, callback);

};



export {consultaTodosUsuarios, crearUsuario, editarUsuario, eliminarUsuario, consultaUsuario};



