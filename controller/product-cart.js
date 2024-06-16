import AddProductCartSchema from "../schema/add-to-cart-schema.js";

export const getAllCartData = async (userId) => {

    try {

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
                    product: { $first: '$productDetails' }, // $first means after grouping selecting the first element of the item
                    createdAt: { $first: '$createdAt' } // Include the first createdAt value in the group
                }
            },
            {
                $project: { // after grouping project the result so that it will show in api res
                    // productId: '$_id', // this _id refer from above group _id
                    quantity: 1, // {1} means this field should include in the res field, if I set it [0] it will not show in res
                    totalOldPrice: 1,
                    totalNewPrice: 1,
                    createdAt: 1, // Ensure createdAt is projected
                    percentDiscount: {
                        $multiply: [{ $divide: [{ $subtract: ["$totalOldPrice", "$totalNewPrice"] }, "$totalOldPrice"] }, 100]
                    }, // percent calculation
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
            grossTotalNewPrice += item.totalNewPrice;
        });

        // Calculate the percentage discount and round to 2 decimal places
        const percentDiscount = ((grossTotalOldPrice - grossTotalNewPrice) / grossTotalOldPrice * 100).toFixed(0);

        // Calculate the discount amount and round to 2 decimal places
        const discountAmount = (grossTotalOldPrice - grossTotalNewPrice).toFixed(0);

        // Return the cart items and total count
        return {
            cartItems,
            cart_item_no: totalCount,
            grossTotalOldPrice: grossTotalOldPrice,
            grossTotalNewPrice: grossTotalNewPrice,
            percentDiscount: percentDiscount,
            discountAmount: discountAmount
        };

    } catch (error) {
        console.error("Error fetching cart data:", error);
        throw new Error('Internal server error');
    }
};


export const addToCart = async (req, res) => {
    try {
        const data = req.body;
        const userId = req.params.userId;

        const newData = new AddProductCartSchema(data);
        await newData.save();

        const cartData = await getAllCartData(userId);

        res.status(201).json(cartData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export const getCartData = async (req, res) => {

    try {
        const userId = req.params.userId;
        const cartData = await getAllCartData(userId);

        res.status(200).json(cartData);

    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export const removeCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const deletedItem = await AddProductCartSchema.deleteOne({ userId, productId });

        if (deletedItem.deletedCount === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        const cartData = await getAllCartData(userId);

        res.status(200).json(cartData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export const removeCartItemAll = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const deletedItem = await AddProductCartSchema.deleteMany({ userId, productId });

        if (deletedItem.deletedCount === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        const cartData = await getAllCartData(userId);

        res.status(200).json(cartData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};
















