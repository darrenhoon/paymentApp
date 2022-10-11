const app = require("./app")
const http = require('http')

const port = process.env.PORT || 3002
const server = http.createServer(app)
server.listen(port, () => {
    console.log(`[products-service] Server started on port ${port}`);
})

module.exports = server;
