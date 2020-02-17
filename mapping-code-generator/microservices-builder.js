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


start_server('hello_world');

module.exports = { start_server};
