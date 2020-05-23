const Mapping = require("../../models/Mapping.js")
const Microservice = require("../../models/Microservice.js")

getMapping = async (req, res) => {
  const { existing, requested } = req.body
  Mapping.findOne({requested: requested}, (err, mapping) => {
    if(err) {
      console.log(err)
      res.send({status: false, error: err})
    } else {
      if(mapping) {
        res.send({status:true, mapping: mapping})
      } else {
        var mapping = {}
        Microservice.findById(existing, (err, microservice) => {
          if(err) {
            console.log(err)
            res.send({status: false, error: err})
          } else {
            mapping.parameters = microservice.params
            mapping.url = microservice.url
            mapping.getRoute = microservice.getRoute
            mapping.postRoute = microservice.postRoute
            mapping.batchSize = microservice.batchSize
            mapping.port = 5051
            mapping.mappings = {}
            mapping.parameters.forEach(param => {
              mapping.mappings[param] = {
                'param': param,
                'type': null,
                'subType': null,
                'function': {
                  'name': null,
                  'arguments': [],
                  'code': ''
                }
              }
            })
            res.send({status:true, mapping: mapping})        
          }
        })
      }
    }
  })
}

module.exports = getMapping
