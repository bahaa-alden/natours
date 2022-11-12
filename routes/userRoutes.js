const express = require('express');
const fs = require('fs');
const router = express.Router();
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'the route is not yet define',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'the route is not yet define',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'the route is not yet define',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'the route is not yet define',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'the route is not yet define',
  });
};
router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
module.exports = router;
