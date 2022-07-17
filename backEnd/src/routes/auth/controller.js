const controller = require('./../controller');
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = new (class extends controller {
  async register(req, res) {

    let email = await this.User.findOne({ email: req.body.email });
    if (email) {
      return this.response({
        res,
        code: 400,
        message: "this email already registered",
      });
    }

        // User sign up

        let body = req.body;
        let newUser = new this.User(body);
    
        newUser.save().then(() => {
            return newUser.createSession();
        }).then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user
    
            return newUser.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(newUser);
        }).catch((e) => {
            res.status(400).send(e);
      })
  }

  async login(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    this.User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user

            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send("The information entered is not correct");
    });
  }
})();