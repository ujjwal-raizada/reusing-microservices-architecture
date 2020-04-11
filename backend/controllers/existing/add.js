var Microservice = require("../../models/Microservice.js");

add = (req,res) => {
    Microservice.create({
      title:"Flight Booking",
      keywords:["Flights","Tickets","Fast","Cheap","Travel"],
      developer:"Tyler",
      documentation:"C/docs/travel/flight",
      tech_stack:["MongoDB","nodeJS","javascript","React"],
      code_snippet:"Not known",
      params:["param1","param2"],
      url:'https://reqres.in',
      getRoute:'/api/users/2',
      postRoute:'/api/users'
    },
    (err,obj) => {
      console.log(obj);
    }) 
    res.send("Microservice created")
  }

module.exports = add
