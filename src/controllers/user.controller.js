import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../services/user.service.js';

// Get all users - Admin sees all, Regular user sees only themselves
export const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsers(req.user.role, req.user.id);
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
export const getUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.status(200).json({ user });
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({
        error: 'User not found',
      });
    }
    next(error);
  }
};

// Update user
export const updateUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await updateUser(id, req.body, req.user);
    res.status(200).json({
      user: updatedUser,
      message: 'User updated successfully',
    });
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({
        error: 'User not found',
      });
    }
    if (error.message === 'Email already exists') {
      return res.status(409).json({
        error: 'Email already exists',
      });
    }
    next(error);
  }
};

// Delete user
export const deleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({
        error: 'User not found',
      });
    }
    next(error);
  }
};

