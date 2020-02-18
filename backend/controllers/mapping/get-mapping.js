getMapping = async (req, res) => {
    if(req.body.existing === 'A' && req.body.requested === 'B') {
      var  microserviceMapping = {
        'parameters': ['A', 'B', 'C', 'D', 'E'],
        'mappings': {
          'A': {'param': 'A', 'type': 'one-to-one', 'subType': 'type A', 'function': {'name': 'test','arguments': ['B2', 'B1', 'B3'], 'code': 'Hey there Im working'}},
          'B': {'param': 'B', 'type': 'one-to-one', 'subType': 'type B', 'function': {'name': null,'arguments': [], 'code': '(a, b, c){\n    a = b*c + b\n    return a;\n}'}},
          'C': {'param': 'C', 'type': 'one-to-many', 'subType': 'type C', 'function': {'name': null,'arguments': [], 'code': ''}},
          'D': {'param': 'D', 'type': 'one-to-many', 'subType': 'type D', 'function': {'name': null,'arguments': [], 'code': ''}},
          'E': {'param': 'E', 'type': null, 'subType': null, 'function': {'name': null,'arguments': [], 'code': ''}}
        }
      }
      res.json({microserviceMapping})
    } else {
      res.json('well we are working on this feature!!!')
    }
}

module.exports = getMapping
