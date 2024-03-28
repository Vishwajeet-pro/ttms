var express = require('express');
var router = express.Router();
var usermodel = require('./user');
var loadingModel = require('../models/loading')
var gateBModel = require('../models/gateB')

const passport = require('passport');
const localStrategy = require('passport-local');
const gateAModel = require('../models/gateA');
passport.use( new localStrategy(usermodel.authenticate()));

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/gateA', isLoggedin,function(req,res){
  res.render("gateA")
})

router.get('/gateB',isLoggedin, function(req,res){
  res.render("gateB")
})

router.get('/loading', isLoggedin,function(req,res){
  res.render("loading")
})

// router.get('/documentation', isLoggedin,function(req,res){
//   res.render("documentation")
// })

router.get('/register',function(req,res){
  res.render('signup')
})

router.get('/login', function(req,res){
  res.render('login',{error:req.flash('error')})
})

router.get('/dashboard' , isLoggedin,async function(req,res){
   try {
    const username = await usermodel.findOne({ username: req.session.passport.user });
    if (username) {
      const cat = username.category;
      console.log(cat)
      switch(cat) {
        case 'gateA':
          res.redirect('/gateA');
          break;
        case 'gateB':
          res.redirect('/gateB');
          break;
        case 'loading': 
          res.redirect('/loading');
          break;
        }
        
    } else {
        // Handle case where user is not found
        console.log("User not found");
    }
} catch (error) {
    // Handle any potential errors that occur during the database query
    console.error("Error querying user:", error);
}
  
});

router.post('/register',function(req,res){
   
    var userData = new usermodel({
      username:req.body.username,
      secret:req.body.secret,
      name:req.body.name,
      category:req.body.category
    });

    usermodel.register(userData,req.body.password)
    .then(function(registereduser) {
      passport.authenticate("local")(req,res,function(){
          res.redirect('/login');
      })
    })
})

router.post('/login', passport.authenticate('local',{
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}), function(req,res){})


router.post("/loading", isLoggedin,async function(req,res){
  try {
    // Create a new document using the form data
    const newData = new loadingModel(req.body);
    
    // Save the document to MongoDB
    await newData.save();
    
    res.status(200).send('Data saved successfully');
} catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Internal server error');
}
})

router.post("/gateA", isLoggedin,async function(req,res){
  try {
    // Create a new document using the form data
    const newData = new gateAModel(req.body);
    
    // Save the document to MongoDB
    await newData.save();
    
    res.status(200).send('Data saved successfully');
} catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Internal server error');
}
})

router.post("/gateB",isLoggedin, async function(req,res){
  try {
    // Create a new document using the form data
    const newData = new gateBModel(req.body);
    
    // Save the document to MongoDB
    await newData.save();
    
    res.status(200).send('Data saved successfully');
} catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Internal server error');
}
})

router.post('/logout', isLoggedin,function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedin(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect('/')

}

module.exports = router;
