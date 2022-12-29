import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth,resetAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', userController.getAllUsers);

//route to create a new user
router.post('/register', newUserValidator, userController.newUser);

router.post('/loginuser', userController.userlogin);

//route for reset password
router.put('/ResetPassword', resetAuth, userController.ResetPassword);

//route to forgot password
router.post('/forgotpassword', userController.forgotPassword);

export default router;
