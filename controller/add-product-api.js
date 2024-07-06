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
            totalProduct: totalCount

        });


    } catch (error) {
        // Handle other errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export const getProduct = async (req, res) => {

    try {

        const { searchText, category, currentPage, limit } = req.query;

        const query = {};

        if (searchText) {
            query.$or = [
                { 'title': { $regex: searchText, $options: 'i' } },
                { 'productTag': { $regex: searchText, $options: 'i' } }
            ];
        }

        if (category) {

            const categories = Array.isArray(category) ? category : [category];
            query['category'] = { $in: categories.map(cat => new RegExp(cat, 'i')) };
        }

        // Counting documents
        const totalDocumentCount = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 10));

        const options = {

            limit: parseInt(limit, 10) || 10,
            sort: { updatedAt: -1 },
        };

        // Check if the requested page is within the valid range
        if (currentPage > totalPages) {
            return res.status(200).json({ data: [], totalPages });
        }

        options.page = currentPage;

        const result = await Product.paginate(query, options);

        res.status(200).json({  data: result.docs, totalCount: totalDocumentCount });


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
