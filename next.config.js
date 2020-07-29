module.exports = {
    // serverRuntimeConfig: {
    //     // Will only be available on the server side
    //     mySecret: 'secret',
    //     secondSecret: process.env.SECOND_SECRET, // Pass through env variables
    //   },
    env: {
        dev: {
            USER_AUTH_URL: "http://localhost:8080/",
            USER_CRUD_URL: "http://localhost:8081/",
            VRP_RPC_URL: "http://localhost:5000/api/v0.1/vrp"
        },
        prod: {
            USER_AUTH_URL: "http://localhost:8080/",
            USER_CRUD_URL: "http://localhost:8081/"
        },
    },
    webpackDevMiddleware: config => {
        config.watchOptions = {
          poll: 800,
          aggregateTimeout: 300,
        }
        return config
      },
};
