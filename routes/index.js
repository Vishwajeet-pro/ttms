var express = require('express');
var router = express.Router();
var usermodel = require('./user');
var loadingModel = require('../models/loading')
var gateBModel = require('../models/gateB')
var documentationModel = require('../models/documentation')
const passport = require('passport');
const localStrategy = require('passport-local');
const gateAModel = require('../models/gateA');
const fs = require('fs');
const json2xls = require('json2xls')

passport.use(new localStrategy(usermodel.authenticate()));




router.get('/', function (req, res) {
  res.render('index');
});

router.get('/gateA', isLoggedin, function (req, res) {
  res.render("gateA")
})

router.get('/gateB', isLoggedin, function (req, res) {
  res.render("gateB")
})

router.get('/loading', isLoggedin, function (req, res) {
  res.render("loading")
})

router.get('/documentation', isLoggedin, function (req, res) {
  res.render("documentation")
})
router.get('/report', function (req, res) {
  res.render("report")
})

router.get('/register', function (req, res) {
  res.render('signup')
})

router.get('/login', function (req, res) {
  res.render('login', { error: req.flash('error') })
})

router.get('/dashboard', isLoggedin, async function (req, res) {
  try {
    const username = await usermodel.findOne({ username: req.session.passport.user });
    if (username) {
      const cat = username.category;
      console.log(cat)
      switch (cat) {
        case 'gateA':
          res.redirect('/gateA');
          break;
        case 'gateB':
          res.redirect('/gateB');
          break;
        case 'loading':
          res.redirect('/loading');
          break;
        case 'documentation':
          res.redirect('/documentation');
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

router.post('/register', function (req, res) {

  var userData = new usermodel({
    username: req.body.username,
    secret: req.body.secret,
    name: req.body.name,
    category: req.body.category
  });

  usermodel.register(userData, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect('/login');
      })
    })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}), function (req, res) { })


router.post("/loading", isLoggedin, async function (req, res) {
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

router.post("/documentation", isLoggedin, async function (req, res) {
  try {
    // Create a new document using the form data
    const newData = new documentationModel(req.body);

    // Save the document to MongoDB
    await newData.save();

    res.status(200).send('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Internal server error');
  }
})




router.get('/work', async function (req, res) {
  const conp = await usermodel.find()
  res.send(conp)



})



router.post('/report', async function (req, res) {

  const { month, year, type } = req.body;


  // Calculate the start and end dates for the specified month and year
  const startDate = new Date(year, month - 1, 1); // month is 0-indexed in JavaScript
  const endDate = new Date(year, month, 0); // Last day of the month
  var reportModel;
  if (type == "gateA") {
    reportModel = gateAModel;
  }
  else if (type == "gateB") {
    reportModel = gateBModel;
  }
  else if (type == "loading") {
    reportModel = loadingModel;

  }
  else {
    reportModel = documentationModel;
  }


  // Query MongoDB using Mongoose

  const documents = await reportModel.find({
    createdAt: {
      $gte: startDate,
      $lte: endDate
    }
  });

  documents.forEach(element => {


    // Convert JSON data to structured format for Excel
    const excelData = [element ];
    const elm = element;
    // Add header row
    excelData.push(Object.keys(excelData[0]));
    // Add data rows
    for (obj in elm) {

      excelData.push(Object.values(obj));

    }
    // Convert JSON to Excel
    const xls = json2xls(excelData);
    // Write Excel data to a file
    fs.writeFileSync('data.xlsx', xls, 'binary');


  });
  // for download

  res.download('data.xlsx', 'data.xlsx', (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).end();
    } else {
      // Delete the file after download
      fs.unlinkSync('data.xlsx');
    }
  });








})












router.post("/gateA", isLoggedin, async function (req, res) {
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

router.post("/gateB", isLoggedin, async function (req, res) {
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

router.post('/logout', isLoggedin, function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedin(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/')

}

module.exports = router;
