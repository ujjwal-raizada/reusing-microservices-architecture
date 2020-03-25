function addMappings(parameters, mappings, transform) {
    parameters.forEach(parameter => {
        var { name, code } = mappings[parameter].function
        transform += `function ${name} ${code} \n\n`
    });

    return transform
}

function addMain(parameters, mappings, transform) {
    transform += `function transform(request_json) { \n`
    
    // calculate values
    parameters.forEach(parameter => {
        var { name, arguments } = mappings[parameter].function

        transform += `\tvar ${parameter} = ${name}(`
        arguments.forEach((arg, index, arr) => {
            transform += `request_json.${arg}`
            if(index !== arr.length-1) {
                transform += `, `
            }
        })
        transform += `)\n`
    })

    // create response
    transform += `\n\tvar response_json = { \n`
    parameters.forEach(parameter => {
        transform += `\t\t${parameter}: ${parameter},\n`
    })    
    transform += `\t}`

    transform += `\n\n\treturn response_json;\n}`

    return transform
}

function addExport(transform) {
    transform += `\n\nmodule.exports = {transform}\n`
    return transform
}

function transformationGenerator(microserviceMapping) {
    var {parameters, mappings} = microserviceMapping
    var transform = ``

    transform = addMappings(parameters, mappings, transform)
    transform = addMain(parameters, mappings, transform)
    transform = addExport(transform)

    return transform    
}

module.exports = transformationGenerator
