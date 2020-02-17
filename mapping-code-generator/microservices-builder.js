const { spawn } = require("child_process");
const ncp = require('ncp').ncp;
const fs = require('fs');

function start_server(server_name) {
    let server_loc = "./microservices/" + server_name + "/server.js";

    const ls = spawn("node", [server_loc]);

    ls.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });

    ls.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });
}

function build_server(server_name, transformation_code) {
    console.log("Server name: " + server_name);
    
    ncp.limit = 16;
    source = '../microservice-framework'
    destination = './microservices/' + server_name + '/'
    transformation_file = destination + 'transformations.js'

    ncp(source, destination, function (err) {
        if (err) {
          return console.error(err);
        }
        console.log('created copy of microservice...');

        fs.writeFile(transformation_file, transformation_code, function (err) {
            if (err) throw err;
            console.log('server created successfully...');
        }); 
    });


}

code = `
// TODO: Add mapping and translations logic

function transform(request_json) {
    
    // TODO: Auto-generated code goes here
    return request_json;
}

module.exports = {transform}
`

// build_server('hello_world', code);
start_server('hello_world');

module.exports = { start_server, build_server };
