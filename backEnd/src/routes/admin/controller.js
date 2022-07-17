const controller = require('./../controller');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config=require('config')
const jwt=require('jsonwebtoken')

module.exports = new (class extends controller {

  async me(req, res){
        // we know that the user/caller is authenticated and we have the user_id and user object available to us
        req.userObject.generateAccessAuthToken().then((accessToken) => {
          res.header('x-access-token', accessToken).send({ accessToken });
      }).catch((e) => {
          res.status(400).send(e);
      });
  }
 
})();