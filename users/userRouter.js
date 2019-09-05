const express = require('express')
const db = require("./userDb");
const router = express.Router();

router.post('/', validateUser , (req, res) => {
  const userdata = req.body;
  db.insert(userdata)
  .then(response => {
      res.status(200).send(response)
  })
  .catch(error => {
      res.status(402).send(error);
  })
});

router.post('/:id/posts', (req, res) => {  

 
});

router.get('/', (req, res) => { 
    const users = db.get()
    users.then(data => {
        res.json(data);
    }).catch(error => {
        res.send(error)
    })

});

router.get('/:id', (req, res) => { 
    const userid = req.params.id; 
    db.getById(userid)
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        res.send(err)
    })

 
});

router.get('/:id/posts', (req, res) => { 
 

});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const deleteUser = db.remove(id)
    deleteUser.then(response => {
        res.json(response);
    })
        .catch(error => {
            res.json(error)
        })
});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const userId = req.params.userId;
    const result = db.getById(userId)
    result.then(response => {
      if(userId) {
          // if id is valid store the user object as req.user 
         req.user = response;
      } 
      else if(!userId){
          // if id does not match with any user id  
          res.status(400).json({ message: "invalid user id"})
      } 
       next();
    })
    .catch(error => {
       res.status(400).send(error)
    })
};

function validateUser(req, res, next) {
    const userdata = req.body
    const username = req.body.name;
   if(!userdata){
     res.status(400).json({message : "missing user data"})
   } 
   else if(!username) {
      res.status(400).json({message : "missing required name filed"});
   } 
   else {
     next();
   }
 }

function validatePost(req, res, next) { 
    const userbody = req.body;
    const text = req.body.text;
    if (!userbody) {
      res.status(400).json({ message: "missing post data" });
    } else if (!text) {
      res.status(400).json({ message: "missing required text field" });
    } 
    else {
        next();
    }

};

module.exports = router;
