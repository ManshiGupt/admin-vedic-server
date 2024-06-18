import Razorpay from "razorpay";
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const instance = new Razorpay({

    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_KEY

});

export const createRazorPayOrder = async (req, res) => {

    // Extract parameters from request body
    const { amount, currency, receiptId } = req.body;

    const options = {

        amount: amount, // amount in the smallest currency unit (e.g., 5000 paise = 50 INR)
        currency: currency,
        receipt: receiptId,
    };

    try {

        const order = await instance.orders.create(options);

        // Check if order creation was successful
        if (!order) {
            return response.status(500).json({ error: "Error creating order" });
        }

        res.json(order);


    } catch (error) {
        
        res.status(500).send(error);
        response.status(500).json({ error: "Internal server error", error });
    }
};

export const razorPayOrderValidation = async (request, response) => {

    try {
        // Extract parameters from request body
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = request.body;

        // Generate HMAC-SHA256 signature using razorpay secret key
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY);

        //update hmac with razorpay_order_id and razorpay_payment_id
        hmac.update(razorpay_order_id + '|' + razorpay_payment_id);

        //finally generate server side
        const generated_signature = hmac.digest('hex');

        // Compare generated signature with razorpay_signature
        if (generated_signature === razorpay_signature) {

            return response.status(200).json({ msg: "Success" });

        } else {

            return response.status(400).json({ msg: "Signature mismatch" });
        }


    } catch (error) {

        console.error('Error:', error);
        response.status(500).json({ error: "Internal server error" });
    }
};