const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class{
  newlistValidator(){
    
    return [
      check('title')
      .not()
      .isEmpty()
      .withMessage('text is invalid'),
      check('username')
        .not()
        .isEmpty()
        .withMessage('username cant be empty'),
    ]
  }

}