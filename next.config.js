module.exports = {
    // serverRuntimeConfig: {
    //     // Will only be available on the server side
    //     mySecret: 'secret',
    //     secondSecret: process.env.SECOND_SECRET, // Pass through env variables
    //   },
    env: {
        dev: {
            ROUTE_SERVICE_URL: "http://localhost:5000/api/v0.1/route",
            GEOCODE_SERVICE_URL: "http://localhost:5001/api/v0.1/geocode",
            DEPOT_SERVICE_URL: "http://localhost:5002/api/v0.1/depot",
            USER_AUTH_URL: "http://localhost:5003/api/v0.1/"
        },
        prod: {
            USER_AUTH_URL: "http://localhost:5003/api/v0.1/",
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
