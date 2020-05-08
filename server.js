const express = require('express');
const server = express();

const projectRouter = require('./data/projectRouter.js')
server.use('/api/projects', projectRouter)

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h2> API </h2>`)
})

module.exports = server;