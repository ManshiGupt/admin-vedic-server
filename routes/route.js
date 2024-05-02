import express from 'express'

import { createUser, getUserByContactNo, getAllUsers, updateUser, deleteUser} from '../controller/user-profile-api.js';


//configer express router
const router = express.Router();


//route goes here

//create user profile
router.post('/create-user', createUser)

//get user by contact no
router.get('/user', getUserByContactNo);

//get all users
router.get('/all-users', getAllUsers)

//update user
router.put('/update-user/:id', updateUser);

//delete user
router.delete('/delete-user/:id', deleteUser)



export default router