import User from '../models/userModel.js';

export function getAllUsers(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'the route is not yet define',
  });
}
export async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
}

export function getUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'the route is not yet define',
  });
}

export function updateUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'the route is not yet define',
  });
}

export function deleteUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'the route is not yet define',
  });
}
