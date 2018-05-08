var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var mongoDB = 'mongodb://127.0.0.1/HBHD';
var fs = require('fs');
var ObjectId = require('mongodb').ObjectID;

MongoClient.connect(mongoDB, (err, client) => {
  if (err) return console.log(err);
  db = client.db('HBHDItems'); // whatever your database name is
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

/* GET home page. */
router.post('/', function(req, res, next) {
  var filter = req.body.filter;
  db.collection("items").find({section: req.body.filter}).toArray(function(err, results){
    res.render('list.ejs', { choice: filter, item: results });
  });
});

router.get('/addItem', function(req, res, next){
  res.render('addItem.ejs');
})


// SHOW EDIT USER FORM
router.get('/edit/(:id)', function(req, res, next) {
  console.log('testttt');
  var o_id = new ObjectId(req.params.id).toString();


  db.collection('items').find({
    "_id": ObjectId(o_id).toString
  }).toArray(function(err, results) {

    for (var i = 0; i < results.length; i++) {

      if (results[i]._id == o_id) {

        console.log(results[i]);

        res.render('edit.ejs', {
          item: results[i]
        });
      }
    }
  });
});

router.post('/edit/(:id)', function(req, res) {

  var o_id = new ObjectId(req.params.id).toString();


  db.collection('items').find({
    "_id": ObjectId(o_id).toString
  }).toArray(function(err, results) {
    for (var i = 0; i < results.length; i++) {
      if (results[i]._id == o_id) {
        console.log(results[i]);
        db.collection('items').updateOne({
          "_id": results[i]._id
        }, {
          $set: {
            "name": req.body.name,
            "Description": req.body.Description,
            "price": req.body.price
          }
        }, function(err) {

          console.log("success");
          res.redirect('/');
        });
      }
    }
  });
});

router.get('/brewskies', function(req, res){
  db.collection("items").find({section: 'brew'}).toArray(function(err, results){
    res.send(results);
  });
})
router.get('/burgers', function(req, res){
  db.collection("items").find({section: 'burg'}).toArray(function(err, results){
    res.send(results);
  });
})
router.get('/combos', function(req, res){
  db.collection("items").find({section: 'comb'}).toArray(function(err, results){
    res.send(results);
  });
})
router.get('/Deezerts', function(req, res){
  db.collection("items").find({section: 'deez'}).toArray(function(err, results){
    res.send(results);
  });
})
router.get('/dippers', function(req, res){
  db.collection("items").find({section: 'dip'}).toArray(function(err, results){
    res.send(results);
  });
})
router.get('/henhouse', function(req, res){
  db.collection("items").find({section: 'hen'}).toArray(function(err, results){
    res.send(results);
  });
})
router.get('/homewrecker', function(req, res){
  db.collection("items").find({section: 'home'}).toArray(function(err, results){
    res.send(results);
  });
})
router.get('/pick', function(req, res){
  db.collection("items").find({section: 'pick'}).toArray(function(err, results){
    res.send(results);
  });
})
router.get('/rabbit', function(req, res){
  db.collection("items").find({section: 'rab'}).toArray(function(err, results){
    res.send(results);
  });
})
router.get('/subs', function(req, res){
  db.collection("items").find({section: 'subs'}).toArray(function(err, results){
    res.send(results);
  });
})
router.get('/Weenies', function(req, res){
  db.collection("items").find({section: 'wee'}).toArray(function(err, results){
    res.send(results);
  });
})
router.get('/wet', function(req, res){
  db.collection("items").find({section: 'wet'}).toArray(function(err, results){
    res.send(results);
  });
})
router.get('/youngins', function(req, res){
  db.collection("items").find({section: 'youn'}).toArray(function(err, results){
    res.send(results);
  });
})



router.post('/addItem', function(req, res, next){
    db.collection('items').save({section: req.body.section, name: req.body.name, Description: req.body.Description, price: req.body.price});
    res.redirect('/');
})

module.exports = router;