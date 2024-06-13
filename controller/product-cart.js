import AddProductCartSchema from "../schema/add-to-cart-schema.js";

export const addToCart = async (req, res) => {

    try {

        const data = req.body;
        const userId = req.params.userId;

        // Create a new document using the data from the request body
        const newData = new AddProductCartSchema(data);

        // Save the new document to the database
        const createdData = await newData.save();

        // Count the total number of items in the cart collection
        const totalCount = await AddProductCartSchema.countDocuments({ userId: userId });

        // Return a success response with the newly created data and total count
        res.status(201).json({

            cart_item_no: totalCount

        });

        // console.log(data.formData.userId)


    } catch (error) {
        // Handle other errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export const getCartData = async (req, res) => {

    const userId = req.params.userId; // Assuming you pass userId in params

    try {
        console.log("Received userId:", userId);

        // Aggregate cart items for the specific user
        const cartItems = await AddProductCartSchema.aggregate([

            { $match: { userId: userId } }, // $match is one type of filter here it filters by user id
            {
                $lookup: { // getting data from product collection
                    from: 'products',
                    localField: 'productId', // current object field id
                    foreignField: '_id',    // product collection id
                    as: 'productDetails' // return the data as an object array name "productDetails"
                }
            },
            { $unwind: '$productDetails' }, // unwind the productDetails data which we get from the product collection
            {
                $group: { // grouping the productDetails (which we get from product) as per the productId
                    _id: '$productId', // it will automatically project for each common group item
                    quantity: { $sum: 1 }, // Count the number of documents in each group
                    totalOldPrice: { $sum: { $toDouble: '$productDetails.oldPrice' } }, // sum old price
                    totalNewPrice: { $sum: { $toDouble: '$productDetails.newPrice' } }, // sum new price
                    product: { $first: '$productDetails' } // $first means after grouping selecting the first element of the item
                }
            },
            {
                $project: { // after grouping project the result so that it will show in api res
                    // productId: '$_id', // this _id refer from above group _id
                    quantity: 1, // {1} means this field should include in the res field, if I set it [0] it will not show in res
                    totalOldPrice: 1,
                    totalNewPrice: 1,
                    percentDiscount: {

                        $multiply: [{ $divide: [{ $subtract: ["$totalOldPrice", "$totalNewPrice"] }, "$totalOldPrice"]},100]
                    },// percent calculation
                    productDetails: {
                        // _id: '$product._id', // here $product refers to the above group object product
                        image: { $arrayElemAt: ['$product.images', 0] }, // only show the first image from images array string
                        title: '$product.title',
                        subtitle: '$product.subtitle'
                    }
                }
            }
        ]);

        // Count the total number of items in the cart collection for the specific user
        const totalCount = await AddProductCartSchema.countDocuments({ userId: userId });

        //calculating the grosstotal of the product price

        let grossTotalOldPrice = 0;
        let grossTotalNewPrice = 0;

        cartItems.forEach(item => {

            grossTotalOldPrice += item.totalOldPrice;
            grossTotalNewPrice += item.totalNewPrice

        })

        // Calculate the percentage discount and round to 2 decimal places
        const percentDiscount = ((grossTotalOldPrice - grossTotalNewPrice) / grossTotalOldPrice * 100).toFixed(0);

        // Calculate the discount amount and round to 2 decimal places
        const discountAmount = (grossTotalOldPrice - grossTotalNewPrice).toFixed(0);


        // Return the cart items and total count
        res.status(200).json({

            cartItems,
            cart_item_no: totalCount,
            grossTotalOldPrice: grossTotalOldPrice,
            grossTotalNewPrice: grossTotalNewPrice,
            percentDiscount: percentDiscount,
            discountAmount: discountAmount,
            
        });

    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};


export const removeCartItem = async (req, res) => {
    try {

        const { productId, userId } = req.params; // Extracting from params, not body

        // console.log(productId, userId);

        // Find and delete the cart item(s) based on productId and userId
        const deletedItem = await AddProductCartSchema.deleteOne({ productId, userId });

        if (deletedItem.deletedCount === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        // Count the total number of items in the cart collection after deletion
        const totalCount = await AddProductCartSchema.countDocuments({ userId });

        // Return a success response with the total count
        res.status(200).json({ message: 'Cart item deleted successfully', cart_item_no: totalCount });

    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export const removeCartItemAll = async (req, res) => {

    try {

        const { productId, userId } = req.params; // Extracting from params, not body

        console.log(productId, userId);

        // Find and delete the cart item(s) based on productId and userId
        const deletedItem = await AddProductCartSchema.deleteMany({ productId, userId });

        if (deletedItem.deletedCount === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        // Count the total number of items in the cart collection after deletion
        const totalCount = await AddProductCartSchema.countDocuments({ userId });

        // Return a success response with the total count
        res.status(200).json({ message: 'Cart item deleted successfully', cart_item_no: totalCount });

    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};















