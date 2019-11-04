var express = require('express');
var router = express.Router();
const models = require("../models");
const crypto = require("crypto");

// 로그인 GET
router.get('/', function(req, res, next) {
  console.log("GET")
  let session = req.session;
  console.log(req.session.email)

  res.render("login", {
    session: session
  });
});

// 로그인 POST
router.post("/", async function(req,res,next){
  console.log("POST")
  let body = req.body;

  let result = await models.utblogin.findOne({
    where: {
      email : body.userEmail
    }
  });

  let dbPassword = result.dataValues.password;
  let inputPassword = body.password;
  let salt = result.dataValues.salt;
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(dbPassword == hashPassword){
    console.log("Correct");
    req.session.email = body.userEmail;
  }
  else{
    console.log("InCorrect");
  }
  res.redirect("/users");
});

// 로그인 POST
router.delete("/", function(req,res,next){
  console.log("Delete");

  req.session.destroy();
  res.clearCookie('sid');

  res.redirect("/users")
});

module.exports = router;
