import express from 'express'

import { createUser, getUserByContactNo, getAllUsers, updateUser, deleteUser} from '../controller/user-profile-api.js';
import { createFaqHelp, getAllFaq, deleteFaq, updateFaq, downloadFaqExcelFile} from '../controller/faq-help-api.js';


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


//faq section

router.post('/faq-help', createFaqHelp);
router.get('/all-faq-help', getAllFaq);
router.delete('/delete-faq-help/:id', deleteFaq);
router.put('/update-faq-help/:id', updateFaq )
router.get('/download-faq-help-excle-file', downloadFaqExcelFile )


export default router