
import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';

//consulta el listado de los productos

const consultaTodosProductos = async (callback)=>{

    const connection = getDB();
    await connection.collection('productos').find().limit(50).toArray(callback);
      
};


// consulta un producto especifico por id

const consultarProducto =async(id,callback) =>{

  const connection = getDB();
  await connection.collection('productos').findOne({ _id: new ObjectId(id)},callback);

};

// crea un nuevo Producto

const verificarEstado = async (edicion, callback)=>{
  const connection = getDB(); 
  console.log(edicion);
  const ss =  edicion;
  console.log(ss);
  await connection.collection('productos').findOne(ss,callback);
};

const crearProducto = async (datosProducto, callback)=>{

  console.log('Llaves: ', Object.keys(datosProducto));

      if (
          Object.keys(datosProducto).includes('codigoProducto') &&
          Object.keys(datosProducto).includes('descripcionProducto') &&
          Object.keys(datosProducto).includes('valorUnitario') &&
          Object.keys(datosProducto).includes('estado')
        ) {
          // implementar código para crear producto en la BD
          const connection = getDB();
          console.log(datosProducto.codigoProducto);
          const ss =  { codigoProducto: datosProducto.codigoProducto};
          console.log(ss);

          const resultado = await connection.collection('productos').findOne(ss);

              if(resultado){

                return callback(409)
                  //Por implementar
            }
              else{
                await connection.collection('productos').insertOne(datosProducto, callback);
              }         
          
        } else {
          return { error: 'Error en consulta de datos', result: "Hola" };
        }
};


//editar un producto

const editarProducto =async (id,edicion, callback)=>{

      const filtroProducto = { _id: new ObjectId(id) };
      console.log(edicion.id)
      const operacion = {
        $set: edicion,
      };
      const connection = getDB();
     
      await connection.collection('productos').findOneAndUpdate(filtroProducto,operacion, { upsert: true, returnOriginal: true },callback);

};

//elminar un producto

const eliminarProducto = async (id, callback)=>{

    const filtroProducto = { _id: new ObjectId(id) };
    
    const connection = getDB();
    await connection.collection('productos').deleteOne(filtroProducto, callback);

};






export {consultaTodosProductos, crearProducto, editarProducto, eliminarProducto, consultarProducto, verificarEstado};



