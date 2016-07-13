var Bid =  mongoose.model("Bid");
var User = mongoose.model("User");
var Product = mongoose.model("Product");

module.exports=(function(){
  return{

    getResults: function(req, res){
      Product.find({}).populate("_bidId")
              .exec(function(err, productBids){
                if(err){
                  res.json({status: false, error:"Unkown problem"})
                }else {
                  //now fill in User info for each bid
                  User.populate(productBids, {path:"_bidId._userId", model:"User"},
                  function(err, productPopulated){
                    if(err){
                      console.log(err)
                    }else{
                      //all data is populated
                      // res.json({status:true, products:productPopulated});
                      //now find the highest for productid;
                      // console.log(productPopulated);
                      
                      res.json({status: true, products: productPopulated});
                    }
                  })
                }
              })

    },
    create: function(req, res){
      // console.log(req.body, "body from front end");
      var newBid = new Bid({
        amount: req.body.amount,
        _userId: req.body._userId,
        _productId: req.body._productId});


      Bid.find({
        _productId:req.body._productId,
        amount: {$gt: req.body.amount}}, function(err, bid){
          if(bid.length>0){
            console.log("higher bid found");
            var errorsArray = [];
            errorsArray.push("You must bid more than the highest bid")
            res.json({status: false, errors:errorsArray})
          }else{


      Product.findOne({_id:req.body._productId}, function(err, product){
          newBid.save(function(err){
              product._bidId.push(newBid);
              product.save(function(err){
                if(err){
                  //handle these errors
                  console.log(err)
                }else{
                  User.findOne({_id:req.body._userId}, function(err, user){
                    if(err){
                      console.log(err)
                    }else{
                      user._bidId.push(newBid)
                      user.save(function(err){
                        if(err){
                          console.log(err)
                        }else{
                          res.json({status: true, bid: newBid})
                        }
                      })
                    }
                  })
                }
              })
          })
      }) // add below
      }
    })
}
}
})();
