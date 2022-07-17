const express = require('express');
const { verifySession } = require('../../middleware/admin');
const router = express.Router();
const controller = require('./controller');

router.get(
  '/',
  verifySession,
  controller.me
  );

module.exports = router;
