import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';


//AREGGLARR

//consulta el listado de las ventas

const consultaTodosVentas = async (callback)=>{

    const connection = getDB();
    await connection.collection('ventas').find().limit(50).toArray(callback);
      
};


// consulta una venta especifico por id

const consultarVenta =async(id,callback) =>{

  const connection = getDB();
  await connection.collection('ventas').findOne({ _id: new ObjectId(id)},callback);

};



// crea una Nuevo Venta ****PENDIENTE CON LAS VALIDACIONES

const crearVenta = async (datosVenta, callback)=>{

  
  console.log('Llaves: ', Object.keys(datosVenta));

      if (
          Object.keys(datosVenta).includes('usuario') &&
          Object.keys(datosVenta).includes('rol') &&
          Object.keys(datosVenta).includes('estado')
        ) {
          // implementar código para crear vehículo en la BD
          const connection = getDB();
          console.log(datosVenta.usuario);
          const ss =  { usuario: datosVenta.usuario};
          console.log(ss);

          const resultado = await connection.collection('ventas').findOne(ss);

          if(resultado){

              //No se como se desarrolla      
            
          }else{

            await connection.collection('ventas').insertOne(datosUsuario, callback);

          }         
          
        } else {
          return { err: 'Error en consulta de datos', result: "Hola" };
        }
};


//editar una venta

const editarVenta =async (id,edicion, callback)=>{

  
  const filtroVenta = { _id: new ObjectId(id) };
  console.log("aqui,",id);
  console.log(filtroVenta);
  const operacion = {
    $set: edicion,
  };
  const connection = getDB();
 
  await connection.collection('ventas').findOneAndUpdate(filtroVenta,operacion, { upsert: true, returnOriginal: true },callback);

};




//elminar una venta

const eliminarVenta = async (id, callback)=>{

    const filtroVenta = { _id: new ObjectId(id) };
    
    const connection = getDB();
    await connection.collection('ventas').deleteOne(filtroVenta, callback);

};



export {consultaTodosVentas, crearVenta, editarVenta, eliminarVenta, consultarVenta };



