
# todolistapi2
=======
admin
robertovegasuay@gmail.com
vegasuay
Wsxcde10#

mongo shell: /Descargas/mongodb-3.4.9/bin

sudo ./mongo "mongodb://cluster0-shard-00-00-shzfp.mongodb.net:27017,cluster0-shard-00-01-shzfp.mongodb.net:27017,
cluster0-shard-00-02-shzfp.mongodb.net:27017/test?replicaSet=Cluster0-shard-0" --authenticationDatabase admin --ssl --username vegasuay --password Wsxcde10#

mongodb+srv://vegasuay:<PASSWORD>@cluster0-shzfp.mongodb.net/test?retryWrites=true

var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://kay:myRealPassword@cluster0.mongodb.net/test";
MongoClient.connect(uri, function(err, client) {
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});


Endpoint API

HTTP	URL	                Descripción
===============================================================
GET	    /api/todos	        Devuelve todas las tareas de la BD
POST	/api/todos	        Crea una tarea
DELETE	/api/todos/:todo	Borra una tarea

como funciona el flow de autorizacion en oauth2
1. GET /api/oauth2/authorize como autenticacion basica con usuario
y contraseña y estos parametros:
-client_id
-response_type
-redirect_uri
http://localhost:3000/api/oauth2/authorize?client_id=this_is_my_id&response_type=code&redirect_uri=http://localhost:3000

De esta llamada obtenemos un transction_id que usamos en la siguiente llamada

2. POST /api/oauth2/authorize como autenticacion basica con usuario
y contraseña y estos parametros:
-client_id
-response_type
-redirect_uri
-transaction_id

De esta llamada obtenemos un token encriptado que usamos en la siguiente llamada

3. POST /api/oauth2/token com autenticacion basica de cliente con id del cliente 
y secret como password y estos parametros en body
-code
-redirect_uri
-grant_type

