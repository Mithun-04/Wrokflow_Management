import { Schema, model } from "mongoose";

const member = new Schema({
    user_id : {type : Schema.Types.ObjectId, ref : 'User'},
    role : {type : String , required : true},
    status: {type : String , required : true , default : 'pending'}
    });

const ProjectSchema = new Schema({
  name: {type : String , required : true , unique : true},
  created_by:{type: Schema.Types.ObjectId, ref: 'User'},
  members:{
    type : [member],
    required : true
  }
});


export default model("Project", ProjectSchema);