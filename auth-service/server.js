const app = require("./app")
const http = require('http')

const port = process.env.PORT || 3000
// var server = app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// })
const server = http.createServer(app)
server.listen(port, () => {
    console.log(`[auth-service] Server started on port ${port}`);
})

module.exports = server;
