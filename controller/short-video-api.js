import AddShortVideoSchema from "../schema/short-video-schema.js";

//creating new user (user registration)
export const createShortVideo = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddShortVideoSchema(data);

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

export const getAllShortVideo = async (req, res) => {

    const { currentPage, limit} = req.query;

    try {

        const query = {};
        
        // Counting documents
        const totalDocumentCount = await AddShortVideoSchema.countDocuments();
        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 15));

        const options = {
            
            page: currentPage > totalPages ? totalPages : currentPage,
            limit: parseInt(limit, 10) || 15,
            // sort: { createdAt: -1 },
        };

        const result = await AddShortVideoSchema.paginate(query, options);

        // Return the list of all users
        res.status(200).json({ data: result.docs, totalPages: totalDocumentCount });

    } catch (error) {
        // Respond with internal server error if something goes wrong
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
