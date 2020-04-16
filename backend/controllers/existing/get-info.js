var Requestmicro = require("../../models/RequestedMS.js");

getInfo = async (req, res, next) => {
    if(req.body.microservice === 'B') {
      var requestedMicroservice = {
        'parameters' : ['B1', 'B2', 'B3', 'B4', 'none'],
        'parameterAttributes' : {
          'B1': {'name': 'B1', 'type': 'int'},
          'B2': {'name': 'B2', 'type': 'string'},
          'B3': {'name': 'B3', 'type': 'float'},
          'B4': {'name': 'B4', 'type': 'int'},
        }
      }

      res.json({requestedMicroservice})

    } else {
      var micro_id = req.body.microservice ;

      Requestmicro.findById(micro_id, (err, one_micro) => {
        if (err) {
          console.log("Oops Error:" + err);
          res.send({status:false,error:err})
        } else {
          var parameters = one_micro.params ;         
          parameterAttributes = {} 

          for(var i=0 ; i < parameters.length; i++){
             parameterAttributes[parameters[i]] = {'name': parameters[i] , 'type': typeof(parameters[i])} 
          }
          
          parameters.push('none') ;
          var requestedMicroservice = {
            'parameters' : parameters,
             'paramterAttributes': parameterAttributes
          } 
          console.log(requestedMicroservice) ; 
          res.json({requestedMicroservice});
        }
      });

    }
}

module.exports = getInfo
