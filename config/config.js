var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'iti-digital'
    },
    port: 3000,
    db: 'mongodb://localhost/iti-digital-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'iti-digital'
    },
    port: 3000,
    db: 'mongodb://localhost/iti-digital-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'iti-digital'
    },
    port: 3000,
    db: 'mongodb://localhost/iti-digital-production'
  }
};

module.exports = config[env];
