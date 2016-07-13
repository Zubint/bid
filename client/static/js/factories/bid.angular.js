myApp.factory("BidFactory", function($http){
  var factory={};


  factory.createBid=function(bid, callback){
    console.log(bid, " bid in factoyr")
    $http.post("/bids", bid).success(function(response){
      callback(response);
    })
  }

  factory.getResults = function(callback){
    console.log("get results");
    $http.get('/bids').success(function(response){
      callback(response);
  })
}
  //add more methods above

return factory;
})
