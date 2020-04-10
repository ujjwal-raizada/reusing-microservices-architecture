var Requestmicro = require("../../models/RequestedMS.js");

add = (req,res) => {
    Requestmicro.create({
      title:"Text Analyser",
      params:["paramB1","paramB2"]
    },
    (err,obj) =>{
      console.log(obj);
    }) 
    res.send("Microservice created")
  }

module.exports = add
