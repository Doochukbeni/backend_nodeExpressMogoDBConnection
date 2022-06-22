const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel.js');

router.post('/register', function (req, res) {
  // read the body of POST request
  const document = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    dateCreated: req.body.dateCreated,
  };

  // create a new document in mongoDB database
  UserModel.create(document)
    // if successful
    .then(() => res.send('Done !'))
    // to handle the error
    .catch((err) => console.log('DB create error', err));
});

router.get('/all', function (req, res) {
  UserModel.find()
    .then((document) => res.send(document))
    .catch((err) => console.log('err user/all', err));
});

router.put('/update', function (req, res) {
  // The search criteria
  const search = { _id: mongoose.Types.ObjectId(req.body._id) };

  // The replacement of the document
  const updatedDocument = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  };

  // This will tell MongoDB to show the updated document
  const options = { new: true };

  UserModel.findOneAndUpdate(search, updatedDocument, options)
    .then(function (updatedDocument) {
      res.send(updatedDocument);
    })
    .catch(function (error) {
      console.log('Error /user/update', error);
    });
});

module.exports = router;
