function configGenerator(microserviceMapping) { 
  var { url, getRoute, postRoute, port } = microserviceMapping

  var config = `const config = {
    host: '${url}',
    port: ${port},
    routes: {
      get: '${getRoute}',
      post: '${postRoute}'
    }\n};\n\n`

  config += `module.exports = config\n`

  return config;
}

module.exports = configGenerator
