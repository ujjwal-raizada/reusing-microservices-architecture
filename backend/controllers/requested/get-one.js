var Requestmicro = require("../../models/RequestedMicroservice.js");

getOne = (req, res) => {
    let micro_id = req.body.micro_id;
    Requestmicro.findById(micro_id, (err, one_micro) => {
      if (err) {
        console.log("Oops Error:" + err);
        res.send({status:false,error:err})
      } else {
        res.send({status:true,micro:one_micro});
      }
    });
  }

module.exports = getOne
