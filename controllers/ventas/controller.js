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
          Object.keys(datosVenta).includes('codigoVenta') &&
          Object.keys(datosVenta).includes('cliente') &&
          Object.keys(datosVenta).includes('idCliente') &&
          Object.keys(datosVenta).includes('totalVenta') &&
          Object.keys(datosVenta).includes('fechaVenta')&&
          Object.keys(datosVenta).includes('vendedor')&&
          Object.keys(datosVenta).includes('estado')
        ) {
          // implementar código para crear venta en la BD
          const connection = getDB();
          console.log(datosVenta.codigoVenta);
          const ss =  { codigoVenta: datosVenta.codigoVenta};
          console.log(ss);

          const resultado = await connection.collection('ventas').findOne(ss);

          if(resultado){

            return callback(409)    
            
          }else{

            await connection.collection('ventas').insertOne(datosVenta, callback);

          }         
          
        } else {
          return { err: 'Error en consulta de datos' };
        }
};


//editar una venta

const editarVenta =async (id, edicion, callback)=>{

  const filtroVenta = { _id: new ObjectId(id) };
  console.log("aqui,",id);
  console.log(filtroVenta);
  const operacion = {
    $set: edicion,
  };
  const connection = getDB();
 
  await connection.collection('ventas').findOneAndUpdate(filtroVenta,operacion, { upsert: true, returnOriginal: true },callback);

};

//eliminar una venta

const eliminarVenta = async (id, callback)=>{
    const filtroVenta = { _id: new ObjectId(id) };
    const connection = getDB();
    await connection.collection('ventas').deleteOne(filtroVenta, callback);

};


export {consultaTodosVentas, crearVenta, editarVenta, eliminarVenta, consultarVenta };



