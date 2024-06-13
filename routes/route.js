import express from 'express'

import { validateTokenForApi, validateTokenForRoute } from '../middleware/token-verification.js';

import { createUser, getUserByContactNo, getAllUsers, updateUser, deleteUser} from '../controller/user-profile-api.js';
import { createFaqHelp, getAllFaq, deleteFaq, updateFaq, downloadFaqExcelFile} from '../controller/faq-help-api.js';
import {userRegistration, userLogin} from '../controller/user-registration-api.js';
import { sendOTP, verifyOTP, resendOTP } from '../controller/send-otp-api.js';
import { uploadFile } from '../controller/file-upload.api.js';
import { addToCart, getCartData, removeCartItem, removeCartItemAll } from '../controller/product-cart.js';
import { addProduct, getProduct, getProductById} from '../controller/add-product-api.js';


//configer express router
const router = express.Router();


//route goes here

//totken validation
router.post('/validate-token', validateTokenForRoute);

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
router.get('/all-faq-help', validateTokenForApi, getAllFaq);
router.delete('/delete-faq-help/:id', deleteFaq);
router.put('/update-faq-help/:id', updateFaq )
router.get('/download-faq-help-excle-file', downloadFaqExcelFile )

//user registration
router.post('/registration', userRegistration )
router.post('/login', userLogin )

router.post('/send-otp', sendOTP )
router.post('/verify-otp', verifyOTP )
router.post('/resend-otp', resendOTP )


//upload file
router.post('/upload-image', uploadFile)

//add to cart
router.post('/add-to-cart/:userId', addToCart)
router.get('/get-cart-data/:userId', getCartData);
// router.get('/get-cart-data/', getCartData);

//add product
router.post('/add-product', addProduct)
router.get('/get-product', getProduct)
router.get('/get-product-by-id/:productId', getProductById);
router.delete('/delete-cart-item/:userId/:productId', removeCartItem);
router.delete('/delete-all-cart-item/:userId/:productId', removeCartItemAll);


export default router