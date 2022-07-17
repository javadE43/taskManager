
const autoBind = require("auto-bind");
const {validationResult} = require('express-validator');
const List = require("../models/ListsTask");
const User = require('./../models/user');
const  Task  = require("./../models/tasks");

module.exports = class {
  constructor() {
    autoBind(this);
    this.User = User;
    this.List=List;
    this.Tasks=Task
  }

  validationBody(req,res){
    const result = validationResult(req);
    if(!(result.isEmpty())){
      const errors = result.array();
      const messages = [];
      errors.forEach(err => messages.push(err.msg));
      res.status(400).json({
        message: 'validation error',
        data: messages
      })
      return false;
    }
    return true;
  }

  validate(req,res,next){
    // console.log(req.body)
    if(!this.validationBody(req,res)){
      return;
    }
    next();
  
  }

  deleteTasksFromList(_listId) {
    this.Tasks.deleteMany({
        _listId
    }).then(() => {
        console.log("Tasks from " + _listId + " were deleted!");
    })
}

  response({res, message, code=200, data={}}){
    res.status(code).json({
      message,
      data
    });
    console.log(res)
  }

}; 