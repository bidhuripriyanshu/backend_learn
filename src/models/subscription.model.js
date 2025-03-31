import mongoose from "mongoose";

const subscriptionSchema = new Schema({
      subcriber :{
        type: Schema.Types.ObjectId,//one who suubscribing
        ref:"User"
      } ,
      channel :{
        type: Schema.Types.ObjectId,//one to whom suubscriber is subscribing
        ref:"User"
      }    
},{timestamps:true});

export const Subscription = mongoose.model("subscription", subscriptionSchema);