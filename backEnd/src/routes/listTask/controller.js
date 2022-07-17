const controller = require('../controller');
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = new (class extends controller {

  // create new listTask
  async newList(req, res) {
    let title = await this.List.findOne({ title: req.body.title });
    if (title) {
      return this.response({
        res,
        code: 400,
        message: "this task already registered",
      });
    }
    title = new this.List({
      username:req.body.username,
      title:req.body.title,
      _userId: req.user_id,
    })
    await title.save();
    this.response({
      res,
      message: "Task was registered",
      data: _.pick(title, ["_id", "username","title"]),
    });
  }

  // 
  async getOneList(req,res){
    const list=await this.List.findOne({title:req.params.id})
    res.json(
      [
          {
              data:list,
              massage:'ok'
          }
      ]
  )

  }

  async getlist(req,res){
   // We want to return an array of all the lists that belong to the authenticated user 
   const list=await this.List.find({_userId: req.user_id})
   if(list){
        res.json(
        
          {
            data:list,
            message:'ok'
          }
        
      ) 
   }
  }

  async patchList(req,res){
    const list=await this.List.findOneAndUpdate({
      title:req.params.id,
      _userId: req.user_id
    },{
      $set:req.body
    },{new:true})
    res.send({ 'message': 'updated successfully'});
}

async putlist(req,res){
  const list=await this.List.findOneAndUpdate({title:req.params.id},{
    $set:req.body
  },{new:true})
  res.json(
    [
        {
            data:list,
            massage:'ok'
        }
    ]
)   
}


async deleteLists(req,res){
  const list=await this.List.findByIdAndRemove({
    _id:req.params.id,
    _userId: req.user_id


  })
  if(!list){
          return res.status(404).json({
              data:null,
              massage:'the list with the given was not found', 
      });
  }
  res.send(list);
    // delete all the tasks that are in the deleted list
    this.deleteTasksFromList(list._id);
}


async getAlltask(req,res){
 const task= await this.Tasks.findOne({
    _id:req.params.taskId,
    _listId:req.params.listId
  }).populate("task")
  res.json(
    [
        {
            data:task,
            massage:'ok'
        }
    ]
)

}


})();