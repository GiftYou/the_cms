var express = require('express');
var router = express.Router();
var Users = require('../models/Users');

/* GET users listing. */
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
        }else{}
      })
  }
})

module.exports = router;
