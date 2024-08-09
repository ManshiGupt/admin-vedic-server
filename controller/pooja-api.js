import AddPoojaSchema from "../schema/pooja-schema.js";
import AddFeedbackReview from "../schema/feedback-review-schema.js";
import AddPanditSchema from "../schema/pandit-schema.js";

export const createPooja = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddPoojaSchema(data);

        // Save the new document to the database
        await newData.save();

        // Return a success response with the newly created data
        res.status(201).json(newData);

    } catch (error) {

        // Handle other errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};


export const getAllPoojas = async (req, res) => {

    try {
        const { searchText, category, currentPage = 1, limit = 10 } = req.query;

        const query = {};

        if (searchText) {
            query.$or = [
                { 'title': { $regex: searchText, $options: 'i' } },
                { 'poojaTag': { $regex: searchText, $options: 'i' } }
            ];
        }

        if (category) {
            const categories = Array.isArray(category) ? category : [category];
            query['category'] = { $in: categories.map(cat => new RegExp(cat, 'i')) };
        }

        const totalDocumentCount = await AddPoojaSchema.countDocuments(query);
        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 10));

        if (currentPage > totalPages) {
            return res.status(200).json({ data: [], totalPages });
        }

        const options = {

            page: currentPage,
            limit: parseInt(limit, 10) || 10,
            sort: { index: -1 },

        };

        const result = await AddPoojaSchema.paginate(query, options);

        const poojaWithAvgStars = await Promise.all(result.docs.map(async (pooja) => {

            const feedbackReviews = await AddFeedbackReview.find({ poojaId: pooja._id });

            const totalStars = feedbackReviews.reduce((total, review) => total + review.stars, 0);
            const avgStars = feedbackReviews.length ? (totalStars / feedbackReviews.length).toFixed(1) : 0;


            return { ...pooja.toObject(), avgStars, feedbackReviews };

        }));

        const poojaWithPrices = await Promise.all(poojaWithAvgStars.map(async (pooja) => {

            const panditData = await AddPanditSchema.find({ 'poojaNames.poojaId': pooja._id });

            let minPrice = Infinity;
            let maxPrice = -Infinity;

            panditData.forEach(pandit => {

                pandit.poojaNames.forEach(poojaName => {
                    if (poojaName.poojaId.toString() === pooja._id.toString()) {
                        const price = parseFloat(poojaName.newPrice);
                        if (price < minPrice) minPrice = price;
                        if (price > maxPrice) maxPrice = price;
                    }
                });
                
            });

            if (minPrice === Infinity) minPrice = 0; // Handle case where no price was found
            if (maxPrice === -Infinity) maxPrice = 0; // Handle case where no price was found

            return { ...pooja, minPrice, maxPrice };
        }));


        res.status(200).json({ data: poojaWithPrices, totalPages });

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};


export const getPoojaById = async (req, res) => {
    
    const poojaId = req.params.poojaId;

    try {
        
        // Find pooja by id
        const poojaItem = await AddPoojaSchema.findById(poojaId);

        if (!poojaItem) {
            return res.status(404).json({ message: 'Pooja not found' });
        }

        // Fetch feedback reviews associated with the pooja
        const feedbackReviews = await AddFeedbackReview.find({ poojaId });

        // Calculate average star rating
        const totalStars = feedbackReviews.reduce((total, review) => total + review.stars, 0);
        const avgStars = feedbackReviews.length ? (totalStars / feedbackReviews.length).toFixed(1) : 0;

        // Fetch pandit data to calculate min and max prices
        const panditData = await AddPanditSchema.find({ 'poojaNames.poojaId': poojaId });

        let minPrice = Infinity;
        let maxPrice = -Infinity;

        panditData.forEach(pandit => {
            pandit.poojaNames.forEach(poojaName => {
                if (poojaName.poojaId.toString() === poojaId.toString()) {
                    const price = parseFloat(poojaName.newPrice);
                    if (price < minPrice) minPrice = price;
                    if (price > maxPrice) maxPrice = price;
                }
            });
        });

        if (minPrice === Infinity) minPrice = 0; // Handle case where no price was found
        if (maxPrice === -Infinity) maxPrice = 0; // Handle case where no price was found

        // Merge the poojaItem with the additional fields
        const responseData = {
            ...poojaItem.toObject(),
            avgStars,
            feedbackReviews,
            minPrice,
            maxPrice
        };

        // Return the merged object
        res.status(200).json(responseData);

    } catch (error) {
        console.error('first error', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};



export const updatePooja = async (req, res) => {

    try {

        const { id } = req.params; // Assuming you pass the id as a URL parameter
        const data = req.body;

        // Find the document by id and update it with the new data
        const updatedData = await AddPoojaSchema.findByIdAndUpdate(id, data, { new: true });

        if (!updatedData) {
            return res.status(404).json({ message: 'Pooja Samagri not found' });
        }

        res.status(200).json(updatedData);

    } catch (error) {

        // Handle other errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

