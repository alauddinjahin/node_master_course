/**
 * create & export environment variables
 */


// container for all the environments

let environments = {};

// Staging(Default) environment

environments.staging = {
    "httpPort": 3000,
    "httpsPort": 3001,
    "envName": "staging"
};


// Production environment
environments.production = {
    "httpPort": 5000,
    "httpsPort": 5001,
    "envName": "production"
};

// Determine which environment was passed as a command-line argument

let currentEnvironment = typeof(process.env.NODE_ENV)  === "string" ? process.env.NODE_ENV.toLowerCase() : '';

// Check the current environment is one of the environments above, If not default to staging 

let environmentToExport = typeof(environments[currentEnvironment]) === "object" ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;