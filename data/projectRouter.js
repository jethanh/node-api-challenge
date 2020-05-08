const express = require('express');
const Action = require('./helpers/actionModel')
const Project = require('./helpers/projectModel')

const router = express.Router();

// get projects
router.get('/', (req, res) => {
    Project.get()
        .then(item => {
            res.status(200).json(item)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Somethin' went wrong, bucko." })
        })
})

               // projects array: 

               // [
               //     {
               //         "id": 1,
               //         "name": "",
               //         "description": "",
               //         "completed": false
               //     }
               // ]

//get actions for a project
router.get('/:id/actions', (req, res) => {
    const id = req.params.id;
    Project.getProjectActions(id)
        .then(item => {
            res.status(200).json(item)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Somethin' went wrong, bucko." })
        })
})


//post a new project

router.post('/', (req, res) => {
    console.log(req.body)
})







module.exports = router;