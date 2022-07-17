const mongoose=require('mongoose');
const timestamp=require('mongoose-timestamp');


const ListTaskSchma=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:1,
        // maxlength:20,
        lowercase:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        minlength:1,
        // maxlength:20,
        lowercase:true,
        trim:true
    },
        // with auth
        _userId: {
            type: mongoose.Types.ObjectId,
            required: true
    }

});
ListTaskSchma.plugin(timestamp);
const List=mongoose.model("list",ListTaskSchma)

module.exports=List