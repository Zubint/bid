var User = mongoose.model("User");

var sessionUser={loggedIn:false};

module.exports = (function(){
  return{

      regUser: function(req, res){
        console.log("req.body", req.body.name);

        if(req.body.name !=undefined){
          var newName = req.body.name.toLowerCase().trim(); //find lower case as that is how data is stored
        }
        console.log(newName);

        User.find({name:newName}, function(err, user){
          if (err){
            console.log(err);
          }else {
            //check for an empty result
            // console.log("before checking for user.name: ", user);
            if(user[0]){
                //this exists, just log in
                console.log("existing login");
                sessionUser ={
                  loggedIn:true,
                  userName:user[0].name,
                  user_id: user[0]._id,
                  time: Date()
                }
                res.json({status:true, sessionUser:sessionUser});
            }else {
              //add the user
              var newUser = new User({
                name:newName //this is so that string comparisons for uniqueness can be done easily.
                                                 //custom filter on front end will change this back to sentence case.
              })
              newUser.save(function(err, newUser){
                if(err){
                  console.log("save: ", err, newUser)
                  var errorsArray=[];
                  for(var i in err.errors){
                      errorsArray.push(err.errors[i].message);
                  }
                  res.json({status:false, errors: errorsArray});
                }else{
                  sessionUser ={
                    loggedIn:true,
                    userName:newUser.name,
                    user_id: newUser._id,
                    time: Date()
                  }
                  res.json({status:true, sessionUser:sessionUser});
                }
              })
            }
          }
        })
      },

      session: function(req, res){
        res.json({status:true, sessionUser:sessionUser})
      },

      logout: function(req, res){
          sessionUser= {loggedIn: false}
          console.log(sessionUser);
        res.json({status:true, sessionUser:sessionUser})
      }

        //add in additional methods above
    }
})();
