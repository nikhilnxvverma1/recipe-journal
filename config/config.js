const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

//environment specific object
const dbOptions={
	database:"weight-track-development",// change this as per environment
	username:"root",
	password:"admin123", // TODO should be imported from elsewhere outside of code. But no biggie for development purposes.
	port:3306, // default for mysql
	dialect:"mysql"
}

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'weight-track'
    },
    port: process.env.PORT || 3000,
	db: dbOptions,
  },

  test: {
    root: rootPath,
    app: {
      name: 'weight-track'
    },
    port: process.env.PORT || 3000,
    db: dbOptions,
  },

  production: {
    root: rootPath,
    app: {
      name: 'weight-track'
    },
    port: process.env.PORT || 3000,
    db: dbOptions,
  }
};

module.exports = config[env];
