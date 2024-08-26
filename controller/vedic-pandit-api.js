import AddPanditSchema from "../schema/pandit-schema.js";
import AddFeedbackReview from "../schema/feedback-review-schema.js";

export const createVedicPandit = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddPanditSchema(data);

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

export const getAllVedicPandit = async (req, res) => {

    try {

        const { searchText, category, currentPage = 1, limit = 10 } = req.query; // Default currentPage to 1 and limit to 10 if not provided

        const query = {}; // You can add conditions here if needed

        if (searchText) {

            query.$or = [
                { 'name': { $regex: searchText, $options: 'i' } },
                { 'panditTag': { $regex: searchText, $options: 'i' } }
            ];

        }

        if (category) {
            const categories = Array.isArray(category) ? category : [category];
            query['poojaNames'] = { $in: categories.map(cat => new RegExp(cat, 'i')) };
        }

        // Counting documents
        const totalDocumentCount = await AddPanditSchema.countDocuments(query);
        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 10)); // Calculate total pages

        // Check if the requested page is within the valid range
        if (currentPage > totalPages) {
            return res.status(200).json({ data: [], totalPages }); // Return empty array if currentPage exceeds totalPages
        }

        const options = {
            page: currentPage, // Current page
            limit: parseInt(limit, 10) || 10, // Number of records per page
            sort: { createdAt: -1 }, // Sorting by createdAt in descending order
        };

        const result = await AddPanditSchema.paginate(query, options); // Perform pagination query

        // Calculate average star rating for each pandit
        const panditsWithAvgStars = await Promise.all(result.docs.map(async (pandit) => {

            // console.log(pandit._id)

            const feedbackReviews = await AddFeedbackReview.find({ panditId: pandit._id });

            const totalStars = feedbackReviews.reduce((total, review) => total + review.stars, 0);
            const avgStars = feedbackReviews.length ? (totalStars / feedbackReviews.length).toFixed(1) : 0;

            return { ...pandit.toObject(), avgStars };

        }));

        res.status(200).json({ data: panditsWithAvgStars, totalPages }); // Return paginated data with avgStars and totalPages

    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any unexpected errors
    }
};


export const getPanditById = async (req, res) => {

    const panditId = req.params.panditId;

    try {
        // Find pandit by id
        const panditItem = await AddPanditSchema.findById(panditId);

        if (!panditItem) {
            return res.status(404).json({ message: 'Pandit not found' });
        }

        // Fetch feedback reviews associated with the pandit
        const feedbackReviews = await AddFeedbackReview.find({ panditId });

        // Calculate average star rating
        const totalStars = feedbackReviews.reduce((total, review) => total + review.stars, 0);
        const avgStars = feedbackReviews.length ? (totalStars / feedbackReviews.length).toFixed(1) : 0;

        // Return the pandit and associated feedback reviews with average star rating
        res.status(200).json({ panditItem, feedbackReviews, avgStars });

    } catch (error) {
        console.error('first error', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};


export const updateVedicPandit = async (req, res) => {

    const { id } = req.params; // Assuming the ID is passed as a URL parameter
    const data = req.body;

    try {
        // Find the document by ID and update it with the new data
        const updatedData = await AddPanditSchema.findByIdAndUpdate(id, data, { new: true });

        if (!updatedData) {
            return res.status(404).json({ message: 'Pandit not found' });
        }

        // Return a success response with the updated data
        res.status(200).json(updatedData);

    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};


export const getPanditByPooja = async (req, res) => {

    const poojaId = req.params.poojaId;

    try {
        
        const { searchText, category, currentPage = 1, limit = 10 } = req.query; // Default currentPage to 1 and limit to 10 if not provided

        const query = {

            poojaNames: { $elemMatch: { poojaId: poojaId } } // Filter based on poojaId in poojaNames array

        };

        if (searchText) {

            query.$or = [
                { 'name': { $regex: searchText, $options: 'i' } },
                { 'panditTag': { $regex: searchText, $options: 'i' } }
            ];

        }

        if (category) {

            const categories = Array.isArray(category) ? category : [category];
            query['poojaNames.category'] = { $in: categories.map(cat => new RegExp(cat, 'i')) };

        }

        // Counting documents
        const totalDocumentCount = await AddPanditSchema.countDocuments(query);
        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 10)); // Calculate total pages

        // Check if the requested page is within the valid range
        if (currentPage > totalPages) {
            return res.status(200).json({ data: [], totalPages }); // Return empty array if currentPage exceeds totalPages
        }

        const options = {

            page: currentPage, // Current page
            limit: parseInt(limit, 10) || 10, // Number of records per page
            sort: { createdAt: -1 }, // Sorting by createdAt in descending order

        };

        const result = await AddPanditSchema.paginate(query, options); // Perform pagination query

        // Calculate average star rating for each pandit
        const panditsWithAvgStars = await Promise.all(result.docs.map(async (pandit) => {

            const feedbackReviews = await AddFeedbackReview.find({ panditId: pandit._id });
            const totalStars = feedbackReviews.reduce((total, review) => total + review.stars, 0);
            const avgStars = feedbackReviews.length ? (totalStars / feedbackReviews.length).toFixed(1) : 0;


            return { ...pandit.toObject(), avgStars };

        }));

        res.status(200).json({ data: panditsWithAvgStars, totalPages }); // Return paginated data with avgStars and totalPages


    } catch (error) {

        res.status(500).json({ message: error.message }); // Handle any unexpected errors

    }
}

