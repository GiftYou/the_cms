var express = require('express');
var router = express.Router();
var Users = require('../models/Users');
const secret = 'dontlook'

router.get('/list', function(req, res) {
  res.send('fuck you')
})

router.post('/list', function(req, res, next){
  res.send('fuck you post method')
})

// ==== POST REGISTER ====
router.post('/register', function(req, res, next){
  let email = "barry@yahoo.com";
  let password = "barry111";
  let retypepassword = "barry111";

  let response = {
    message: "",
    data: {},
    token: ""
  }
  if(password == retypepassword){
    Users.findOne({email})
      .then(result => {
        if(result){
          response.message = 'Email already registered';
          console.log(response);
          return res.status(200).json(response);
        }else{
          var token = jwt.sign({email: email}, secret)
          let user = new Users({
            email: email,
            password: password,
            token: token
          })
          user.save()
            .then(data =>{
              response.message = "register are done"
              response.data.email = email;
              response.token = token;
              res.status(201).json(response);
            })
            .catch(err =>{
              console.log(err);
            })
            .catch(err =>{
              res.status(500).json({
                error: err
              })
            })
        }
      })
      .catch(err => {
        res.status(500).json({
          error: true,
          message: "error user find one"
        })
      })
  }
  else{
    response.message = "password unmatch"
    res.status(500).json(response);
  }
})

module.exports = router;