const controller = require('../controller');
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = new (class extends controller {

  async newtask(req, res) {
 
    let title = await this.List.findOne({ title: req.body.title });
    // if (title) {
      
    //   return this.response({
    //     res,
    //     code: 400,
    //     message: "this task already registered",
    //   });
    // }
    this.List.findOne({
      _id: req.params.listId,
      _userId: req.user_id
  }).then((list) => {
      if (list) {
          return true;
      }
      // else - the list object is undefined
      return false;
  }).then((canCreateTask) => {
      if (canCreateTask) {
          let newTask = new this.Tasks({
              title: req.body.title,
              _listId: req.params.listId,
              description:req.body.description,
              completed:req.body.completed,
              category: req.params.listId,
          });
          newTask.save().then((newTaskDoc) => {
            this.response({
              res,
              message: "Task was registered",
              data: _.pick(newTaskDoc, ["_id","title","description","completed"]),
            });
          })
      } else {
          res.sendStatus(404);
      }
  })
  }



  async getAllTask(req,res){
    if(!req.params.listId){
      res.status(400).send(
        {
          data:{},
          message:"ERROR",
          success:false
        }
      )
      return
   }
   if(!req.user_id){
    res.status(400).send(
      {
        data:{},
        message:"ERROR",
        success:false
      }
    )
    return
  }
    const list=await this.Tasks.find(
      {
        _listId:req.params.listId,
        _userId: req.user_id
    }
      ).populate('category')
      .then(response=>{
        res.json(response) 
      })
      .catch(err=>{
        res.send("not task")
        throw new Error(err)
      })  
  }




  async getTask(req,res){
    if(!req.params.listId){
      res.status(400).send(
        {
          data:{},
          message:"ERROR",
          success:false
        }
      )
      return
   }
   if(!req.user_id){
    res.status(400).send(
      {
        data:{},
        message:"ERROR",
        success:false
      }
    )
    return
 }
    const task= await this.Tasks.findOne({
       _id:req.params.taskId,
       _listId:req.params.listId,
       _userId: req.user_id
     }).populate("category")
    try {
      res.json(
        [
            {
                data:task,
                massage:'ok',
                success:true,
            }
        ]
    )
    } catch (error) {
      res.send(error)
    }
   
   }




  async patchList(req,res){
    if(!req.params.listId){
      res.status(400).send(
        {
          data:{},
          message:"ERROR",
          success:false
        }
      )
      return
   }
  
    if(!req.user_id){
      res.status(400).send(
        {
          data:{},
          message:"ERROR",
          success:false
        }
      )
      return
   }
  
    this.List.findOne({
      _id: req.params.listId,
      _userId: req.user_id
  }).then((list) => {
      if (list) {
          // list object with the specified conditions was found
          // therefore the currently authenticated user can make updates to tasks within this list
          return true;
      }
    

      // else - the list object is undefined
      return false;
  }).then((canUpdateTasks) => {
      if (canUpdateTasks) {
          // the currently authenticated user can update tasks
          this.Tasks.updateOne({
              _id: req.params.taskId,
              _listId: req.params.listId
          }, {
              title: req.body.title,
              _listId: req.params.listId,
              description:req.body.description,
              completed:req.body.completed,
              category: req.params.listId,
              }
          ).then((list) => {
              res.json(
                [
                    {
                        data:list,
                        message: 'Updated successfully.'
                    }
                ]
            )
          })
      } else {
          res.sendStatus(404);
      }
  })

}

async putlist(req,res){

  if(!req.params.listId){
    res.status(400).send(
      {
        data:{},
        message:"ERROR",
        success:false
      }
    )
    return
 }
 if(!req.user_id){
  res.status(400).send(
    {
      data:{},
      message:"ERROR",
      success:false
    }
  )
  return
}
 if(!req.params.taskId){
  res.status(400).send(
    {
      data:{},
      message:"ERROR",
      success:false
    }
  )
  return
}
  this.List.findOne({
    _id: req.params.listId,
    _userId: req.user_id
}).then((list) => {
    if (list) {
        // list object with the specified conditions was found
        // therefore the currently authenticated user can make updates to tasks within this list
        return true;
    }
  

    // else - the list object is undefined
    return false;
}).then((canUpdateTasks) => {
    if (canUpdateTasks) {
        // the currently authenticated user can update tasks
        this.Tasks.updateOne({
            _id: req.params.taskId,
            _listId: req.params.listId
        }, {
            title: req.body.title,
            _listId: req.params.listId,
            description:req.body.description,
            completed:req.body.completed,
            category: req.params.listId,
            }
        ).then((list) => {
            res.json(
              [
                  {
                      data:list,
                      message: 'Updated successfully.'
                  }
              ]
          )
        })
    } else {
        res.sendStatus(404);
    }
})
}


async deleteLists(req,res){

 this.Tasks.findOneAndRemove({
    _id: req.params.taskId,
    _listId: req.params.listId
  }).then((removedTaskDoc) => {
    res.send(removedTaskDoc);
})

}

})();
