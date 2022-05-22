/**
 * Library for storing & Editting data
*/

// Defendencies

const fs = require("fs")
const path = require("path")


// container for the module (to be exported) 

const lib = {};
lib.baseDir = path.join(__dirname, "/../.data/");

// write data to a file 
lib.create = (dir, file, data, callback) => {
    // Opent the file for writting 
    fs.open(`${lib.baseDir}${dir}/${file}.json`,'wx', (err, fileDescriptor) => {
        // console.log(`${lib.baseDir}${dir}/${file}.json`);
        if(err){
            callback("Unable to create file.")
            return false;
        }

        if(fileDescriptor){
            // Convert data to string 
            let stringData = JSON.stringify(data);
            // Write the file & close it
            fs.writeFile(fileDescriptor, stringData, (err)=>{
                if(err){
                    callback("Unable to write a new file")
                    return false;
                }

                fs.close(fileDescriptor, (er) => {
                    if (er) {
                        callback("Unable to close the file");
                        return false;
                    }

                    callback(false)
                })
            })
        }
    });
}


lib.read = (dir, file, callback) => {

    // console.log(`${lib.baseDir}${dir}/${file}.json`);
    fs.readFile(`${lib.baseDir}${dir}/${file}.json`,"utf8", function(err, data){
        callback(err, data)
    })
}


lib.update = (dir, file, data, callback) => {
    fs.open(`${lib.baseDir}${dir}/${file}.json`, 'r+', (err, fileDescriptor) =>{
        if (err) {
            callback("Unable to Update file.")
            return false;
        }

        if (fileDescriptor) {
            // Convert data to string 
            let stringData = JSON.stringify(data);
            // Truncate the file 
            fs.truncate(fileDescriptor, (err)=>{
                if (err){
                    callback("Error truncating file!")
                    return false;
                }

                // Write the file & close it
                fs.writeFile(fileDescriptor, stringData, (err) => {
                    if (err) {
                        callback("Unable to write a new file")
                        return false;
                    }

                    fs.close(fileDescriptor, (er) => {
                        if (er) {
                            callback("Unable to close the file");
                            return false;
                        }

                        callback(false)
                    })
                })
            })
        }
    })
}


lib.delete = (dir, file, callback)=>{
    // Unlink the file 
    fs.unlink(`${lib.baseDir}${dir}/${file}.json`, (err)=>{
        if (err) {
            callback("Unable to delete file!")
            return false;
        }

        callback(false)
    })
}

module.exports = lib;

