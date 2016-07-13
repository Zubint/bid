var Product =  mongoose.model("Product");
var User = mongoose.model("User");

module.exports=(function(){
  return{

    getProducts: function(req, res){
      Product.find({}, function(err, products){
        if(products.length>0){
          console.log("found something")

          //if you get here, you can check for bids and populate them

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
                          res.json({status:true, products:productPopulated});
                        }
                      })
                    }
                  })

          // res.json({status: true, products:products})
        }else {
          var product1 = new Product ({name:"Coffee Mug"});
          var product2 = new Product ({name:"iPhone"});
          var product3 = new Product ({name:"Founatin Pen"});
          product1.save(function(err){ if(err){console.log(err)}});
          product2.save(function(err){ if(err){console.log(err)}});
          product3.save(function(err){ if(err){console.log(err)}});

          Product.find({}, function(err, allProducts){
            if(err){
              console.log(err)
            }else{
              res.json({status:true, products:allProducts});
            }
          })
          }//end of else
      })
      console.log("out of find");
    }
}
})();
