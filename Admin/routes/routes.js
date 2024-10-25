import express from 'express';
import {
  getUsers,
  createUser,
  login,
  updateUser,
  deleteUser,
  getUserActivity
} from '../controllers/controllers.js';
import authUser from '../middleware/auth.js';
import isAdmin from '../middleware/admin.js';

const router = express.Router();

// User Management Routes
router.get('/getusers',authUser,isAdmin, getUsers);
router.post('/createusers', createUser);
router.post('/login',login);
router.put('/updateusers/:id',authUser,isAdmin, updateUser);
router.delete('/deleteusers/:id',authUser,isAdmin, deleteUser);

// Analytics Route
router.get('/analytics/user-activity',authUser,isAdmin, getUserActivity);

export default router;