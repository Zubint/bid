var UserSchema = new mongoose.Schema({
  name:{type:String,
    required:[true, "You must provide a name"],
    minlength:[3, "Name must be at least 3 characters"],
    maxlength:[50, "Name cannot exceed 50 characters"]},
    _bidId: [{type: mongoose.Schema.Types.ObjectId, ref:"Bid"}]
}, {timestamps:true});

mongoose.model('User', UserSchema) //register the model.
