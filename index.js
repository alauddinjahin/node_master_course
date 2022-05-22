/**
 * Primary file for the API
*/

// dependencies 
const http = require('http');
const https= require("https");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const fs = require("fs")
const _data = require("./lib/data");
const handlers = require("./lib/handlers")

// Testing 
// @TODO delete this 

// _data.create("test","newFile", {"foo": "bar"}, function(err){
//     console.log(err);
// });


// _data.read("", "newFile", function (err, data) {
//     console.log("err:", err, "data:", data);
// });


// _data.update("", "newFile", {"name":"Jahin"}, function (err) {
//     console.log("err:", err);
// });

// _data.delete("", "newFile", function (err) {
//     console.log("err:", err);
// });


// console.log(url);

// instantiate the http server
const config = require("./config")
const PORT  = config.httpPort;
const PORT2 = config.httpsPort;
const MODE  = config.envName;
const httpServer = http.createServer((req, res) => unifiedServer(req, res))

// Start http Server and have it listen on Port 3000
httpServer.listen(PORT, _ => console.log("Server is Listening on PORT: " + PORT))


// instantiate the http server
const httpsServerOptions = {
    "key": fs.readFileSync("./https/key.pem"),
    "cert": fs.readFileSync("./https/cert.pem")
};

const httpsServer = https.createServer(httpsServerOptions, (req, res) => unifiedServer(req, res))

// Start https erver and have it listen on Port 3000
httpsServer.listen(PORT2, _ => console.log("Server is Listening on PORT: " + PORT2))



// All  the logic for http & https server

const unifiedServer = function(req, res){
    // get the URL & Parse it 
    const parsedURL = url.parse(req.url, true)

    // Get the path of the URL
    const path = parsedURL.pathname;
    const trimedPath = path.replace(/^\/+|\/+$/g, '')

    // Get the Query String as an Object
    const queryString = parsedURL.query;

    // Get Method 
    const method = req.method.toLowerCase();
    // console.log(method);

    // get the headers 
    const headers = req.headers;

    // get the payload 
    const decoder = new StringDecoder("utf-8");
    var buffer = "";
    req.on("data", (data) => {
        buffer += decoder.write(data);

    })

    req.on("end", () => {
        buffer += decoder.end();

        // Choose the handlers this request  should go to. If one is not found then use the not found handler
        const chosenHandler = typeof (router[trimedPath]) !== "undefined" ? router[trimedPath] : handlers.notFound;

        // Construct the data object to send to the handlers 
        const data = {
            "trimedPath": trimedPath,
            "queryString": queryString,
            "method": method,
            "headers": headers,
            "payload": buffer
        };

        // Route the request to the handler specified in the router 

        chosenHandler(data, function (statusCode, payload) {
            // use the status code  
            statusCode = typeof (statusCode) === "number" ? statusCode : 200;
            // use the payload callback 

            payload = typeof (payload) === "object" ? payload : {};

            // Convert payload to string 
            const payloadString = JSON.stringify(payload);

            // Return the response 
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);


            console.log("Request response ", statusCode, payload);


        })

        // Send the response 
        // res.end("Hello World\n")

        // Log the request path 
        // console.log("Request receive with payload " + buffer);

    })
}


// Define a request router 
const router = {
    "ping": handlers.ping,
    "users": handlers.users,
}
