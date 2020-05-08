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

// ----------------------------------------------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------------------------------------------


//post a new project

router.post('/', (req, res) => {
    const info = req.body;
    Project.insert(info)
      .then(item => {
        res.status(201).json(item)
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "Somethin' went wrong, bucko." })
      })
  });

// ----------------------------------------------------------------------------------------------------------------

//get project by ID

router.get('/:id', (req, res) => {
    Project.get(req.params.id)
    .then(item => {
        res.status(200).json(item)
    })
    .catch(err =>
        res.status(500).json({ error: "Somethin' went wrong, bucko" })
    )
});

// ----------------------------------------------------------------------------------------------------------------

//delete project

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Project.remove(id)
      .then(res.status(200).end())
      .catch(err => {
        res.status(500).json({ errorMessage: "Somethin' went wrong, bucko." })
      })
})

// ----------------------------------------------------------------------------------------------------------------

//update project

router.put('/:id', (req, res) => {
    console.log(req.body)
    console.log(req.params)
    const { id } = req.params;
    const changes = req.body;
    Project.update(id, changes)
      .then(item => {
          res.status(200).json(item)
        })
      .catch(err =>
        res.send(500).json({ errorMessage: "Somethin' went wrong, bucko." })
      );
  });



module.exports = router;