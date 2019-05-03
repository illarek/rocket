// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    local: {
      host: '127.0.0.1',
      port: 8545,
      //from: "0xD95AA0803888b38195fcCD62F68e121B8f4f1fc9",
      network_id: '*' // Match any network id
    },
    ropsten:  {
      network_id: 3,
      host: "127.0.0.1",
      port:  8545,
      gas:   1900000
    },
    rinkeby: {
      host: "localhost", // Connect to geth on the specified
      port: 8545,
      //from: "0x6a6401AEb4a3beb93820904E761b0d86364bb39E", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 1900000 // Gas limit used for deploys
    },
    live: {
     network_id: 1,
     host: "localhost",
     port: 8546,
     gas: 2000000 // Gas limit used for deploys
   }
  }
}
