const controller = require('./../controller');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config=require('config')
const jwt=require('jsonwebtoken')

module.exports = new (class extends controller {
  async dashboard(req, res){
    res.send("user dashboard")
  }
  async me(req, res){
    this.response({res,data: _.pick(req.user,["name","email"])})
  }
 
})();