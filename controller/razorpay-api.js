import Razorpay from "razorpay";
import dotenv from 'dotenv';

dotenv.config();

const instance = new Razorpay({

    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_KEY

});

export const createRazorPayOrder = async (req, res) => {

    const options = {
        amount: 5000, // amount in the smallest currency unit (e.g., 5000 paise = 50 INR)
        currency: 'INR',
        receipt: 'receipt#1',
    };

    try {

        const order = await instance.orders.create(options);
        res.json(order);


    } catch (error) {
        
        res.status(500).send(error);
    }
};