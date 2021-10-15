import { MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({path: './.env'});

const stringConnection = process.env.DATABASE_URL;

const client = new MongoClient(stringConnection,{

    useNewUrlParser: true,
    useUnifiedTopology: true,  

});

let connection;

    const connectDB = (callback) =>{

        client.connect((err,db)=>{

            if(err){
                console.error("Error conectando a la base de datos");
                return 'error';
            }
        
            connection = db.db('ModVentas'); // Nombre de la Base de Datos
            console.log("conexion exitosa");
            return callback();
        });   
    }; 

    const getDB = ()=>{
        return connection;
    }


export {connectDB, getDB};