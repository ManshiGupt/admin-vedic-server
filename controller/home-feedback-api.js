import AddHomePageFeedback from "../schema/home-testimonial.js";

export const createHomeFeedback = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddHomePageFeedback(data);

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

export const getAllHomePageFeedback = async (req, res) => {
    try {
        const { currentPage = 1, limit = 10 } = req.query; // Default currentPage to 1 and limit to 10 if not provided

        const query = {}; // You can add conditions here if needed

        // Counting documents
        const totalDocumentCount = await AddHomePageFeedback.countDocuments(query);
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

        const result = await AddHomePageFeedback.paginate(query, options); // Perform pagination query

        res.status(200).json({ data: result.docs, totalPages }); // Return paginated data and totalPages

    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any unexpected errors
    }
};