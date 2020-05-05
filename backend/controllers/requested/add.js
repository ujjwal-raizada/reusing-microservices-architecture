var Requestmicro = require("../../models/RequestedMicroservice.js");

add = (req,res) => {
    Requestmicro.create(
      req.body.data,
      (err,obj) => {
        if(err) {
          console.log(err);
          res.send('1')
        } else {
          res.send('0')
        }
      })
  }

module.exports = add
