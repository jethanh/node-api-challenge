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
    if(!info.name || !info.description){
        res.status(400).json({ errorMessage: "Please provide name and description" })
    } else if(info.description.length > 128){
        res.status(400).json({ errorMessage: "Description too long" })
    } else {
        Project.insert(info)
        .then(item => {
          res.status(201).json(item)
        })
        .catch(err => {
          res.status(500).json({ errorMessage: "Somethin' went wrong, bucko." })
        })
    }
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
    const changes = req.body
    Project.update(id, changes)
    .then(newInfo => {
      if(newInfo){
        Project.getById(id)
        .then(item => {
          res.status(200).json(item)
        })
        .catch(err => {
          res.status(500).json({ errorMessage: "Somethin' went wrong, bucko." })
        })
      } else {
        res.status(500).json({ errorMessage: "Somethin' went wrong, bucko." })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Somethin' went wrong, bucko." })
    })

});

// ----------------------------------------------------------------------------------------------------------------

//post an action to a project

router.post('/:id/actions', validatePost, (req, res) => {
    req.body.project_id = req.project
    if(!req.body.notes || !req.body.description){
        res.status(400).json({ error: 'desc and notes required' })
        } else {
        Action.insert(req.body)
            .then(item => {
            res.status(201).json(item);
      })
            .catch(err => {
            res.status(500).json({ errorMessage: "Somethin' went wrong, bucko" })
      })}
      
  });

router.post('/:id/actions')


function validatePost(req, res, next) {
    Project.get(req.params.id)
        .then(item => {
            if (item) {
                req.body.project_id = item.project_id
                req.project = req.params.id
                next();
            } else {
                res.status(400).json({ error: "Project not found" })
            }
        })
}



module.exports = router;