import { Schema, model } from 'mongoose';

const userschema = new Schema({
    name: { type: String, required: true },
    email : {type : String , required : true},
    password : {type : String , required : true}

});


export default model('User', userschema);