const config = {
    host: 'http://ujjwalraizada.pythonanywhere.com/api',
    port: 5052,
    batchSize: 8,
    routes: {
      get: '/',
      post: '/bulk'
    }
};

module.exports = config
