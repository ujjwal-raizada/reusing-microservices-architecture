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
      res.json('well we are working on this feature!!!')
    }
}

module.exports = getMapping
