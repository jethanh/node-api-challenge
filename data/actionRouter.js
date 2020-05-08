const express = require('express');
const Action = require('./helpers/actionModel')
const Project = require('./helpers/projectModel')

const router = express.Router();

router.get('/', (req, res) => {
    Action.get()                                                                 
    .then(item => {                                                           
        res.status(200).json(item)                                            
    })                                                                        
    .catch(err => {                                                           
        console.log(err)                                                      
        res.status(500).json({ error: "Somethin' went wrong, bucko." })       
    })      
  });
  
  router.get('/:id', (req, res) => {
    Action.get(req.params.id)
    .then(item => {
        res.status(200).json(item)
    })
    .catch(err =>
        res.status(500).json({ error: "Somethin' went wrong, bucko" })
    )
  });
  
  router.delete('/:id', (req, res) => {
    const id = req.params.id
    Action.remove(id)
      .then(res.status(200).end())
      .catch(err => {
        res.status(500).json({ errorMessage: "Somethin' went wrong, bucko." })
      })
  });
  
  router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    User.update(id, changes)
      .then(newInfo => {
        if(newInfo){
          Action.getById(id)
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
  
  
  module.exports = router;
  