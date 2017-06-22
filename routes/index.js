var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var assert = require('assert');

var url="mongodb://localhost:27017/myDb";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MongoDB + Express' });
});

router.get('/get-data', function(req, res, next) {
    var resultArray=[];
    mongo.connect(url,function (err,db) {
        assert.equal(null,err);

        var cursor=db.collection('emp').find();
        cursor.forEach(function (doc,err) {
            assert.equal(null,err);

            resultArray.push(doc);
        },function () {
            db.close();
            res.render("index",{items:resultArray,title: 'MongoDB + Express Get Data'});
        });
    });


});

router.post('/insert', function(req, response, next) {
      var item={
          fName:req.body.fname,
          lName:req.body.lname
    };
      mongo.connect(url,function (err,db) {
          assert.equal(null,err);

          db.collection('emp').insertOne(item,function (err,res) {
              assert.equal(null,err);
              console.log('Item Inserted');
              db.close();

              response.redirect("/get-data");
          });
      });
});



router.post('/delete', function(req, response, next) {
    var uid=req.body.uid;
    var obj_id=new ObjectID(uid);
    var item={
      _id:obj_id
    };
    console.log('Object to Remove =>'+item);
    mongo.connect(url,function (err,db) {
        assert.equal(null,err);

        db.collection('emp').deleteOne(item,function (err,res) {
            assert.equal(null,err);

            console.log('Object Deleted');
            db.close();

            response.redirect("/get-data");
        });
    });

});

router.post('/finddata', function(req, res, next) {
    var resultArray=[];
    var uid=req.body.uid;
    console.log('fetch uid');

    mongo.connect(url,function (err,db) {
       assert.equal(null,err);

       var obj_id = new ObjectID(uid);
       var cursor=db.collection('emp').find(obj_id);
       cursor.forEach(function (doc,err) {
          assert.equal(null,err);

           console.log(doc);
           resultArray.push(doc);
       },function () {
           db.close();
           res.render("index",{upitems:resultArray,title: 'MongoDB + Express Update Data'});
       });
    });

});

router.post('/update',function (req,response,next) {

    var uid=req.body.uuid;
    var obj_id=new ObjectID(uid);
    var searchitem={
        _id:obj_id
    };
    var item={
        fName:req.body.ufname,
        lName:req.body.ulname
    };
    console.log('Object updating...'+uid);
    mongo.connect(url,function (err,db) {
       assert.equal(null,err);

       db.collection('emp').updateOne(searchitem,{$set:item},function (err,res) {
           assert.equal(null,err);

           console.log('Object Updated'+item);
           db.close();

           response.redirect("/get-data");
       });
    });

});

module.exports = router;
