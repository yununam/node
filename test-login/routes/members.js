var express = require('express');
var router = express.Router();
const models = require("../models");
const crypto = require("crypto");

router.get('/', function(req, res, next) {
    res.render("signup");
});
  
router.post("/", function(req,res,next){
    let body = req.body;

    let inputPassword = body.password;
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

    models.utblogin.create({
        email: body.userEmail,
        password: hashPassword,
        salt: salt
    })
    .then( result => {
        res.redirect("/users");
    })
    .catch( err => {
        console.log(err)
    })
});

/*
router.post("/sign_up", function(req,res,next){
let body = req.body;

crypto.randomBytes(64, function(err, buf) {
    crypto.pbkdf2(body.password, buf.toString('base64'), 100000, 64, 'sha512', async function(err, key){
    result = await models.user.create({
        email: body.userEmail,
        password: key,
        salt: buf
    })
    
    res.redirect("/users/sign_up");
    });
});
})
*/

module.exports = router;
