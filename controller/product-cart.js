import mongoose from 'mongoose';
import AddProductCartSchema from "../schema/add-to-cart-schema.js";

export const addToCart = async (req, res) => {

    try {
        const data = req.body;

        // Create a new document using the data from the request body
        const newData = new AddProductCartSchema(data);

        // Save the new document to the database
        const createdData = await newData.save();

        // Count the total number of items in the cart collection
        const totalCount = await AddProductCartSchema.countDocuments();

        // Return a success response with the newly created data and total count
        res.status(201).json({

            cart_item_no: totalCount

        });


    } catch (error) {
        // Handle other errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};


export const getCartData = async (req, res) => {

    
};


  







