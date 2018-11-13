const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

//environment specific object
const dbOptions={
	database:"my-first-schema",// change this as per environment
	username:"recipe-journal-user",
	password:"journal_recipe", // TODO should be imported from elsewhere outside of code. But no biggie for development purposes.
	port:3306, // default for mysql
	dialect:"mysql"
}

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'recipe-journal'
    },
    port: process.env.PORT || 3000,
	db: dbOptions,
  },

  test: {
    root: rootPath,
    app: {
      name: 'recipe-journal'
    },
    port: process.env.PORT || 3000,
    db: dbOptions,
  },

  production: {
    root: rootPath,
    app: {
      name: 'recipe-journal'
    },
    port: process.env.PORT || 3000,
    db: dbOptions,
  }
};

module.exports = config[env];

};

module.exports = config[env];
