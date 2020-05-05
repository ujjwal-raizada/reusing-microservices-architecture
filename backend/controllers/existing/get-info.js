var RequestedMS = require("../../models/RequestedMicroservice.js");

getInfo = async (req, res, next) => {
  const { microservice } = req.body
  RequestedMS.findOne({title: microservice}, {params: 1}, (err, data) => {
    if(err) {
      res.send({status: false, error: err}) 
    } else {
      const params = data.params
      var parameterAttributes = {}
      params.forEach(param => {
        parameterAttributes[param] = {
          'name': param,
          'type': 'string'
        }
      })

      var microservice = {
        'parameters': params,
        'parameterAttributes': parameterAttributes
      }

      res.send({status: true, microservice: microservice})
    }
  })
}

module.exports = getInfo
