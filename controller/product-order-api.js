import ProductOrderSchema from "../schema/product-order-schema.js";

export const createProductOrder = async (req, res) => {

    try {

        const data = req.body;

        // Create a new document using the data from the request body
        const newData = new ProductOrderSchema(data);

        // Save the new document to the database
        const createdData = await newData.save();

        // Return a success response with the newly created data and total count
        res.status(201).json({

            createdData,

        });


    } catch (error) {

        // Handle other errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};