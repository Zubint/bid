var BidSchema = new mongoose.Schema({
  amount:{type:Number, required:true, min:1},
  _userId:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
  _productId:{type: mongoose.Schema.Types.ObjectId, ref:"Product"}
}, {timestamps:true});

mongoose.model("Bid", BidSchema);
