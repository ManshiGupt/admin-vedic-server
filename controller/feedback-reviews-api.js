import AddFeedbackReview from "../schema/feedback-review-schema.js";

export const createFeedbackReviews = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddFeedbackReview(data);

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


export const getAllFeedbackReviews = async (req, res) => {


    const { poojaId, samagriId, panditId, userId, currentPage = 1, limit = 10 } = req.query;

    try {

        const query = {};

        // Add filters to the query object based on the provided query parameters
        if (poojaId) query.poojaId = poojaId;
        if (samagriId) query.samagriId = samagriId;
        if (panditId) query.panditId = panditId;
        if (userId) query.userId = userId;

        // Counting documents
        const totalDocumentCount = await AddFeedbackReview.countDocuments(query);
        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 10));

        // Check if the requested page is within the valid range
        if (currentPage > totalPages) {
            return res.status(200).json({ data: [], totalPages });
        }

        const options = {
            page: currentPage,
            limit: parseInt(limit, 10) || 10,
            sort: { createdAt: -1 },
        };

        const result = await AddFeedbackReview.paginate(query, options);

        res.status(200).json({ data: result.docs, totalPages });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


