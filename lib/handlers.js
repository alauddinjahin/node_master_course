

// Define the handlers 
const handlers = {};

// Sample Handlers
// handlers.sample = function(data,  callback){
//     // Callback a http status code & payload object 
//     callback(406, { name: "Jahin"})
// }


// Ping Handler
handlers.ping = (data, callback) => callback(200);


// users 
handlers.users = (data,  callback) => {
    //
    const acceptableMethods = ["get","post","put","delete"];
    if(acceptableMethods.includes(data.method) >= -1 ){
        handlers._users[data.method](data, callback);
        return false;
    }

    callback(405)
}

// Container for users submethods 

handlers._users ={};

handlers._users.get = (data,  callback)=>{
    //
}

handlers._users.post = (data,  callback)=>{
    //
}

handlers._users.put = (data, callback)=>{
    //
}

handlers._users.delete = (data, callback) =>{
    //
}


// Not found Handler
handlers.notFound = (data, callback) => callback(404);


module.exports = handlers;

// install ssl for the project & press below the command to the terminal
//  openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
