var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var myRouter = express.Router(express.Router({mergeParams: true}));
var User = require('../../model/User.model.js');
var Room = require('../../model/Room.model.js');
var Place = require('../../model/Place.model.js');

/******************** / ************************/
module.exports =  myRouter.get('/',function(req,res){
    Place.find({"belongsTo":req.decoded._doc.username}, function(err, places) {
  if (err) throw err;  
      res.send(places);
      console.log(places);
});
});


module.exports =  myRouter.post('/',function(req,res){
  
    console.log(req.decoded._doc.username);
      var newPlace = Place({
      name: req.body.name,
      belongsTo: req.decoded._doc.username
    });

    // save the user
    newPlace.save(function(err,place) {
      if (err) throw err;
      else
      res.send({'success':!err,place});
      console.log('User created!');
    });
    
});

module.exports =  myRouter.get('/:place',function(req,res){
    Place.find({"belongsTo":req.decoded._doc.username, name:req.params.place}, function(err, places) {
  if (err) throw err;  
      res.send(places);
      console.log(places);
});
});

module.exports =  myRouter.put('/:place',function(req,res){
    Place.findOneAndUpdate({"belongsTo":req.decoded._doc.username, name:req.params.place}
    ,{name:req.body.name}
    ,{new:true}
    , function(err,newPlace){
        if (err) throw err;
        else
        res.send({"Success":true,newPlace});
    });
});

module.exports =  myRouter.delete('/:place',function(req,res){
    Place.findOneAndRemove({"belongsTo":req.decoded._doc.username, name:req.params.place}
    , function(err,oldPlace){
        if (err) throw err;
        else
        {
            var success = false; 
            if(oldPlace) success=true;
            else success=false;
            res.send({"Success":success,oldPlace});}
    });
});