var ProductSchema = new mongoose.Schema({
  name:{type:String, required:true, minlength:4},
  _bidId:[{type: mongoose.Schema.Types.ObjectId, ref:"Bid"}]
}, {timestamps:true});

mongoose.model("Product", ProductSchema);
