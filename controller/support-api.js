import AddSupportSchema from "../schema/support-schema.js";

export const createSupportApi = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddSupportSchema(data);

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

export const getAllSuportApi = async (req, res) => {


    const {currentPage = 1, limit = 10 } = req.query;

    try {

        const query = {};


        // Counting documents
        const totalDocumentCount = await AddSupportSchema.countDocuments(query);
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

        const result = await AddSupportSchema.paginate(query, options);

        res.status(200).json({ data: result.docs, totalPages });

    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
};