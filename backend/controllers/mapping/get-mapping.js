var Microservice = require("../../models/Microservice.js");

getMapping = async (req, res) => {
    if(req.body.existing === 'A' && req.body.requested === 'B') {
      var  microserviceMapping = {
        'parameters': ['A', 'B'],
        'mappings': {
          'A': {'param': 'A', 'type': null, 'subType': null, 'function': {'name': null,'arguments': [], 'code': ''}},
          'B': {'param': 'B', 'type': null, 'subType': null, 'function': {'name': null,'arguments': [], 'code': ''}},
        },
        url:'https://reqres.in',
        getRoute:'/api/unknown',
        postRoute:'/api/users',
        port: 5051,
        batchSize: 2
      }
      res.json({microserviceMapping})
    } else {

      let micro_id = req.body.existing;

      Microservice.findById(micro_id, (err, one_micro) => {
        if (err) {
          console.log("Oops Error:" + err);
          res.send({status:false,error:err})
        } else {
          
          var parameters = one_micro.params ;         
          mappings = {} ;
          for(var i=0 ; i < parameters.length; i++){
             mappings[parameters[i]] = {'param': parameters[i], 
                                        'type': null,
                                        'subType': null,
                                        'function': {'name': null,'arguments': [], 'code': ''} 
                                        } 
          }
          
          var  microserviceMapping = {
            'parameters': parameters,
            'mappings': mappings,
            url:'',
            getRoute:'/api/unknown',
            postRoute:'/api/users',
            port: 5051,
            batchSize: 2
          }
          
          res.json({microserviceMapping})
        }
      });
      }
}

module.exports = getMapping
