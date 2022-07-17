const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');
const { authenticate } = require('../../middleware/admin');


// get task
router.get(
  '/:listId/task',
  authenticate,
  controller.getAllTask
);

// post task new
router.post(
  '/:listId/task',
  authenticate,
  // validator.newlistValidator(),
  controller.newtask
);

// put task
router.put(
  '/:listId/task/:taskId',
   authenticate,
   controller.putlist
)


// patch task
router.get(
  '/:listId/task/:taskId',
  authenticate,
  controller.getTask
)
router.patch(
  '/:listId/task/:taskId',
  authenticate,
  controller.patchList
)

// delete lists
router.delete(
  '/:listId/task/:taskId',
  authenticate,
  controller.deleteLists
)

module.exports = router;
