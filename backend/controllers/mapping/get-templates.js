getTemplates = async (req, res, next) => {
    var templates = {
        'one-to-one': {
            'type A':'abcd',
            'type B':'abc',
            'type C':'ab',
            'type D':'a',
            'custom':''
        },

        'one-to-many': {
            'type X':'abcd',
            'type B':'abcd',
            'type C':'abcd',
            'type D':'abcd',
            'custom':'abcd'
        },

        'batching': {
            'type Y':'abcd',
            'type B':'abcd',
            'type C':'abcd',
            'type D':'abcd',
            'custom':'abcd'
        },

        'splitting': {
            'type G':'abcd',
            'type Z':'abcd',
            'type B':'abcd',
            'type C':'abcd',
            'type D':'abcd',
            'custom':'abcd'
        },

    }
    res.json({templates})
}

module.exports = getTemplates
