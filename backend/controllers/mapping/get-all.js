getAll = async (req, res, next) => {
    var allMappings = {
      'types': ['one-to-one', 'one-to-many', 'batching', 'splitting', 'none'],
      'subTypes': {
        'one-to-one': ['type A', 'type B', 'type C', 'type D', 'custom'],
        'one-to-many': ['type X', 'type C', 'type D', 'type B', 'custom'],
        'batching': ['type F', 'type D', 'type A', 'type B', 'custom'],
        'splitting': ['type G', 'type Z', 'type B', 'type C', 'custom'],
        'none': ['none']
      }
    }
    return res.json({allMappings})
}

module.exports = getAll
