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
            VRP_SERVICE_URL: "http://localhost:5000/api/v0.1/vrp",
            GEOCODE_SERVICE_URL: "http://localhost:5004/api/v0.1/geocode"
        },
        prod: {
            USER_AUTH_URL: "http://localhost:8080/",
            USER_CRUD_URL: "http://localhost:8081/"
        },
    },
    webpackDevMiddleware: config => { // TODO: dev-specific
        config.watchOptions = {
          poll: 800,
          aggregateTimeout: 300,
        }
        return config
      },
};
