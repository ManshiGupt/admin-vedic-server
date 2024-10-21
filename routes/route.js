import express from 'express'

import { validateTokenForApi, validateTokenForRoute } from '../middleware/token-verification.js';

import { createUser, getUserByContactNo, getAllUsers, updateUser, deleteUser, profileVerificationRequest, getAllProfileVerificationRequest } from '../controller/user-profile-api.js';
import { createFaqHelp, getAllFaq, deleteFaq, updateFaq, downloadFaqExcelFile } from '../controller/faq-help-api.js';
import { userRegistration, userLogin } from '../controller/user-registration-api.js';
import { sendOTP, verifyOTP, resendOTP } from '../controller/send-otp-api.js';
import { uploadFile, uploadPostImage } from '../controller/file-upload.api.js';
import { addToCart, getCartData, removeCartItem, removeCartItemAll, getAllCartData } from '../controller/product-cart.js';
import { addProduct, getProduct, getProductById } from '../controller/add-product-api.js';
import { addDeliveryAddress, getDeliveryAddress, updateDeliveryAdd, deleteDeliveryAdd } from '../controller/delivery-address-api.js';
import { createRazorPayOrder, razorPayOrderValidation } from '../controller/razorpay-api.js';
import { createProductOrder } from '../controller/product-order-api.js';
import { generateAnswerGoogleAI } from '../controller/open-ai-api.js';
import { createYouTubeVideo, getAllYoutubeVideo, updateYoutubeVideo, deleteYoutubeVideo } from '../controller/youtube-video-api.js';
import { createPoojaMantra, getAllPoojaMantra, updatePoojaMantra, deletePoojaMantra } from '../controller/pooja-mantra-api.js';
import { createSamagriCategory, getAllSamagriCategory } from '../controller/samagri-category-api.js';
import { createPoojaCategory, getAllPoojaCategory } from '../controller/pooja-category-api.js';
import { createHomePageBanner, getAllHomePageBanner } from '../controller/home-page-banner-api.js';
import { createShortVideo, getAllShortVideo, updateShortVideo } from '../controller/short-video-api.js';
import { createQuote, getAllQuotes, deleteQuote, updateQuote } from '../controller/quote-api.js';
import { createBlog, getAllBlog } from '../controller/blog-api.js';
import { getPanchang } from '../controller/panchang-api.js';
import { createHomeFeedback, getAllHomePageFeedback } from '../controller/home-feedback-api.js';
import { getOlaMap } from '../controller/ola-maps-api.js';
import {createVedicPandit, getAllVedicPandit, getPanditById, updateVedicPandit, getPanditByPooja} from '../controller/vedic-pandit-api.js'
import { createFeedbackReviews, getAllFeedbackReviews } from '../controller/feedback-reviews-api.js';
import { createPooja, getAllPoojas, getPoojaById, updatePooja } from '../controller/pooja-api.js';
import { createPoojaBooking, getAllPoojaBooking, updatePoojaBooking} from '../controller/pooja-booking-api.js';
import { createSupportApi, getAllSuportApi } from '../controller/support-api.js';
import { getHomePageDataApi } from '../controller/home-page-api.js';
import { createBookingSlot, getAllBookingSlots, updateBookingSlots } from '../controller/add-booking-slot-api.js';
import { createTransaction } from '../controller/transaction-api.js';
import { createPoojaSamagri, getAllPoojaSamagri, updatePoojaSamagri } from '../controller/pooja-samagri-api.js';
import { createDailyQuote, getQuoteOfTheDay } from '../controller/add-daily-quote-api.js';
import { createPost, getAllPost, updatePost, deletePost, getPostByUserId, reportPost,getAllPost2 } from '../controller/post-api.js';
import { createNotification, getAllNotification, updateNotification, getTotalNotificationNos} from '../controller/notification-api.js';
import { createUserLog } from '../controller/user-log-api.js';
import { createDeleteAccountRequest, getDeletedAccountInfo, deleteDeletedAccountRequest } from '../controller/account-delete-api.js';
import { getAllReelsAds, updateReelsAds, createReelsAds } from '../controller/reels-ads-api.js';
import { createPhotoGallery, getAllPhotoGallery, updatePhotoGallery } from '../controller/photo-gallery-api.js';
import { createTvSeries, getAllTVSeries, updateTVSeries, deleteTVSeries } from '../controller/tv-series-api.js';
import { createBookmarkMantra, getAllBookmarkByUserId, deleteBookmarkMantra } from '../controller/bookmark-mantra-api.js';
import { createVedicMantraCategory, getAllVedicMantraCategory, updateVedicMantraCategory, deleteVedicMantraCategory } from '../controller/vedic-mantra-category-api.js';
import { createMeditation, getAllMeditation, updateMeditation } from '../controller/meditation-api.js';


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
// router.delete('/delete-user/:id', deleteUser)

//user profile verification request
router.post('/profile-verification-request', profileVerificationRequest)
router.get('/get-all-profile-verification-request', getAllProfileVerificationRequest)


//faq section

router.post('/faq-help', createFaqHelp);
// router.get('/all-faq-help', validateTokenForApi, getAllFaq);
router.get('/all-faq-help', getAllFaq);
router.delete('/delete-faq-help/:id', deleteFaq);
router.put('/update-faq-help/:id', updateFaq)
router.get('/download-faq-help-excle-file', downloadFaqExcelFile)

//user registration
router.post('/registration', userRegistration)
router.post('/login', userLogin)
 
router.post('/send-otp', sendOTP)
router.post('/verify-otp', verifyOTP)
router.post('/resend-otp', resendOTP)


//upload file
router.post('/upload-image', uploadFile)
router.post('/upload-post-image', uploadPostImage)



//add to cart
router.post('/add-to-cart/:userId', addToCart)
router.get('/get-all-cart-data/:userId', getAllCartData);
router.get('/get-cart-data/:userId', getCartData);
router.delete('/delete-cart-item/:userId/:productId', removeCartItem);
router.delete('/delete-all-cart-item/:userId/:productId', removeCartItemAll);

//add product
router.post('/add-product', addProduct)
router.get('/get-product', getProduct)
router.get('/get-product-by-id/:productId', getProductById);

//add delivery address
router.post('/add-delivery-address', addDeliveryAddress)
router.get('/get-delivery-address/:userId', getDeliveryAddress)
router.put('/update-delivery-address/:id', updateDeliveryAdd)
router.delete('/delete-delivery-add/:id', deleteDeliveryAdd);

//razorpay order
router.post('/create-razorpay-order', createRazorPayOrder)
router.post('/validate-razorpay-signature', razorPayOrderValidation)

//create product order
router.post('/create-product-order', createProductOrder)

//generate question using open ai
// router.post('/generate-answer', generateAnswerOpenAI)
router.post('/generate-answer', generateAnswerGoogleAI)

//youtube video
router.post('/create-youtube-video', createYouTubeVideo);
router.get('/get-youtube-video', getAllYoutubeVideo);
router.put('/update-youtube-video/:id', updateYoutubeVideo); 
router.delete('/delete-youtube-video/:id', deleteYoutubeVideo);


//pooja mantra
router.post('/create-pooja-mantra', createPoojaMantra);
router.get('/get-pooja-mantra', getAllPoojaMantra);
router.put('/update-pooja-mantra/:id', updatePoojaMantra);
router.delete('/delete-pooja-mantra/:id', deletePoojaMantra);

//samagari category
router.post('/create-samagri-category', createSamagriCategory);
router.get('/get-all-samagri-category', getAllSamagriCategory);

//pooja category
router.post('/create-pooja-category', createPoojaCategory);
router.get('/get-all-pooja-category', getAllPoojaCategory);

//home page banner
router.post('/create-home-page-banner', createHomePageBanner);
router.get('/get-home-page-banner', getAllHomePageBanner);

//short video
router.post('/create-short-video', createShortVideo);
router.get('/get-short-video', getAllShortVideo);
router.put('/update-get-short-video/:id', updateShortVideo)

//quote
router.post('/create-quote', createQuote);
router.get('/get-quotes', getAllQuotes);
router.put('/update-quote/:id', updateQuote);
router.delete('/delete-quote/:id', deleteQuote);

//blog
router.post('/create-blog', createBlog);
router.get('/get-blogs', getAllBlog);

//panchang
router.post('/get-panchang', getPanchang);

//home page feedback
router.post('/create-home-feedback', createHomeFeedback);
router.get('/get-home-feedbacks', getAllHomePageFeedback);

//ola maps
router.get('/autocomplete', getOlaMap)

//vedic pandit
router.post('/create-vedic-pandit', createVedicPandit);
router.get('/get-vedic-pandits', getAllVedicPandit);
router.get('/get-pandit-by-id/:panditId', getPanditById);
router.put('/vedic-pandit/:id', updateVedicPandit);
router.get('/get-pandit-by-pooja/:poojaId', getPanditByPooja);

//feedback review
router.post('/create-feedback-review', createFeedbackReviews);
router.get('/get-feedback-review', getAllFeedbackReviews);

//pooja
router.post('/create-pooja', createPooja);
router.get('/get-all-poojas', getAllPoojas);
router.get('/get-pooja-by-id/:poojaId', getPoojaById);
router.put('/update-pooja/:id', updatePooja);

//pooja booking
router.post('/create-pooja-booking', createPoojaBooking);
router.get('/get-pooja-booking', getAllPoojaBooking);
router.put('/update-pooja-booking/:id', updatePoojaBooking);

//support
router.post('/create-support-query', createSupportApi);
router.get('/get-support-query', getAllSuportApi);

//homePageApi
router.get('/get-home-page-data', getHomePageDataApi);

//support
router.post('/booking-slot', createBookingSlot);
router.get('/get-booking-slot', getAllBookingSlots);
router.put('/update-booking-slot/:id', updateBookingSlots);

//transaction
router.post('/create-transaction', createTransaction);

//pooja samagri
router.post('/create-pooja-samagri', createPoojaSamagri);
router.get('/get-all-pooja-samagri', getAllPoojaSamagri);
router.put('/update-pooja-samagri/:id', updatePoojaSamagri);


//quote of the day
router.post('/create-quote-of-the-day', createDailyQuote);
router.get('/get-quote-of-the-day', getQuoteOfTheDay);


//post
router.post('/add-post', createPost)
router.get('/get-all-post', getAllPost)
router.get('/get-all-post2', getAllPost2)
router.get('/get-post-by-user/:userId', getPostByUserId)
router.put('/update-post/:id', updatePost)
router.delete('/delete-post/:id', deletePost);
router.post('/report-post', reportPost);


//notification
router.post('/add-notification', createNotification)
router.get('/get-all-notification', getAllNotification)
router.put('/update-notification/:id', updateNotification)
router.get('/get-total-notification-nos', getTotalNotificationNos)


//user log
router.post('/create-user-log', createUserLog)

//account delete
router.post('/delete-account', createDeleteAccountRequest)
router.get('/deleted-account-info', getDeletedAccountInfo)
router.delete('/delete-deleted-account-info/:id', deleteDeletedAccountRequest);


//reels ads
router.post('/add-reels-ads', createReelsAds)
router.get('/get-reels-ads', getAllReelsAds)
router.put('/update-reels-ads/:id', updateReelsAds)


//photo gallery
router.post('/create-photo-gallery', createPhotoGallery);
router.get('/get-all-photo-gallery', getAllPhotoGallery);
router.put('/update-photo-gallery/:id', updatePhotoGallery);


//tv series
router.post('/create-tv-series', createTvSeries);
router.get('/get-all-tv-series', getAllTVSeries);
router.put('/update-tv-series/:id', updateTVSeries);
router.delete('/delete-tv-series/:id', deleteTVSeries);


//mantra bookmark
router.post('/create-mantra-bookmark', createBookmarkMantra);
router.get('/get-mantra-bookmark-by-userId', getAllBookmarkByUserId);
router.delete('/delete-mantra-bookmark/:id', deleteBookmarkMantra);


//Vedic Mantra Category
router.post('/create-mantra-category', createVedicMantraCategory);
router.get('/get-all-mantra-category', getAllVedicMantraCategory);
router.put('/update-mantra-category/:id', updateVedicMantraCategory);
router.delete('/delete-mantra-category/:id', deleteVedicMantraCategory);


//Meditation
router.post('/create-meditation', createMeditation);
router.get('/get-all-meditation', getAllMeditation);
router.put('/update-meditation/:id', updateMeditation);




export default router