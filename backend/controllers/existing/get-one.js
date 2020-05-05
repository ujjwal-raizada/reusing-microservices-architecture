var Microservice = require("../../models/Microservice.js");

getOne = (req, res) => {
    let micro_id = req.body.micro_id;
    Microservice.findById(micro_id, (err, one_micro) => {
      if (err) {
        console.log("Oops Error:" + err);  // TODO: Please improve logging statements
        res.send({status:false,error:err})
      } else {
        res.send({status:true,micro:one_micro});
      }
    });
  }

module.exports = getOne
