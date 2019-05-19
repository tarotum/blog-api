require("dotenv").config();

const {
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  DB_PORT,
  NODE_ENV
} = process.env;

const config = {
  development: {
    app: {
      port: 8000
    },
    db: {
      host: "localhost",
      port: 27017,
      name: "blog-base-dev",
      username: "blog-user-dev",
      password: "blog-user-dev"
    }
  },
  testing: {
    app: {
      port: 8000
    },
    db: {
      host: "localhost",
      port: 27017,
      name: "blog-base-test",
      username: "blog-user-test",
      password: "blog-user-test"
    }
  },
  production: {
    app: {
      port: PORT
    },
    db: {
      host: DB_HOST,
      port: DB_PORT,
      name: DB_NAME,
      username: DB_USER,
      password: DB_PASSWORD
    }
  }
};

module.exports = config[NODE_ENV];
