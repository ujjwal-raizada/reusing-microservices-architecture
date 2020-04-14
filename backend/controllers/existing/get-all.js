var Microservice = require("../../models/Microservice.js");

getAll = (req, res) => {
    Microservice.find({}, (err, All_micro_serv) => {
      if (err) {
        console.log("Retreival Error:" + err);
      } else {
        console.log("All objects sent sucessfully!!!");
        res.send({ micros: All_micro_serv});
      }
    });
}

module.exports = getAll
