const express = require('express');
const server = express();

server.use(express.json());

const projectRouter = require('./data/projectRouter.js')
const actionRouter = require('./data/actionRouter.js')
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)



server.get('/', (req, res) => {
    res.send(`<h2> API </h2>`)
})


module.exports = server;