var Microservice = require("../../models/Microservice.js");

add = (req,res) => {
    Microservice.create(
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
