import Product from "../schema/add-product-schema.js";

export const addProduct = async (req, res) => {

    try {
        const data = req.body;

        // Create a new document using the data from the request body
        const newData = new Product(data);

        // Save the new document to the database
        const createdData = await newData.save();

        // Count the total number of items in the cart collection
        const totalCount = await Product.countDocuments();

        // Return a success response with the newly created data and total count
        res.status(201).json({

            createdData,
            totalProduct : totalCount

        });


    } catch (error) {
        // Handle other errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export const getProduct = async (req, res) => {
    
    try {
        // Fetch all items from the cart collection
        const product = await Product.find();

        // Count the total number of items in the cart collection
        const totalCount = await Product.countDocuments();

        // Return the cart items and total count
        res.status(200).json({
            product,
            totalCount
        });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export const getProductById = async (req, res) => {

    const productId = req.params.productId; // Assuming you pass product id in params

    try {
        // Find product by id
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Return the product
        res.status(200).json({ product });
        
    } catch (error) {
        
        console.error('first error', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};
