const mongoose=require('mongoose');
const timestamp=require('mongoose-timestamp');


const TaskSchma=new mongoose.Schema({
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"list"
    },
    title:{
        type:String,
        required:true,
        minlength:1,
        // maxlength:20,
        lowercase:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        minlength:1,
        // maxlength:30
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});
TaskSchma.plugin(timestamp);
const Task=mongoose.model("Task",TaskSchma)


module.exports=Task