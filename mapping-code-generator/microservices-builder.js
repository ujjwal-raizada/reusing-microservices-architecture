const { spawn } = require("child_process");
const ncp = require('ncp').ncp;
const fs = require('fs');
const { promisify } = require("util");

function start_server(server_name) {
    let server_loc = "./microservices/" + server_name + "/server.js";

    const cp = spawn("node", [server_loc]);

    cp.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });

    cp.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });

    cp.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    cp.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });
}

async function build_server(server_name, transformation_code, configuration) {
    console.log("Server name: " + server_name);
    
    source = '../microservice-framework'
    destination = './microservices/' + server_name + '/'
    transformation_file = destination + 'transformations.js'
    configuration_file = destination + 'config.js'

    const createCopy = promisify(ncp) 
    const writeFile = promisify(fs.writeFile);

    console.log('creating copy of microservice...');
    await createCopy(source, destination, limit = 16)
    .catch(err => {
        console.error(err)
        return 1
    })

    console.log('creating server...');
    await writeFile(transformation_file, transformation_code)
    .catch(err => {
        console.error(err)
        return 2
    })

    await writeFile(configuration_file, configuration)
    .catch(err => {
        console.error(err)
        return 3
    })

    return 0
}

module.exports = { start_server, build_server };
