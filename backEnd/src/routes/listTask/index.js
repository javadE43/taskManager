const express = require('express');
const { authenticate } = require('../../middleware/admin');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');


// get lists
router.get(
  '/',
  authenticate,
  controller.getlist
);
// get
router.get(
  "/:listId/task/:taskId",
  authenticate,
  controller.getAlltask
)
router.get(
  "/:id",
  authenticate,
  controller.getOneList
)

// post lists new
router.post(
  '/',
  authenticate,
  validator.newlistValidator(),
  controller.validate,
  controller.newList
);

// put lists
router.put(
  '/:id',
  controller.putlist
)

// patch lists
router.patch(
  '/:id',
  authenticate,
  controller.patchList
)

// delete lists
router.delete(
  '/:id',
  authenticate,
  controller.deleteLists
)


module.exports = router;
