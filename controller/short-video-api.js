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

    const { currentPage, limit } = req.query;

    try {

        const query = {};

        // Counting documents
        const totalDocumentCount = await AddShortVideoSchema.countDocuments();

        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 15));

        const options = {
            limit: parseInt(limit, 10) || 15,
            sort: { index : -1 },
        };

        // Check if the requested page is within the valid range
        if (currentPage > totalPages) {
            return res.status(200).json({ data: [], totalPages });
        }

        options.page = currentPage;

        const result = await AddShortVideoSchema.paginate(query, options);

        // Return the list of all users
        res.status(200).json({ data: result.docs, totalPages });

    } catch (error) {
        // Respond with internal server error if something goes wrong
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateShortVideo = async (req, res) => {

    try {

        const { id } = req.params;
        const data = req.body;
       
        // Find the existing delivery address by id and update it
        const updatedData = await AddShortVideoSchema.findByIdAndUpdate(id, data, { new: true });

        // Check if the delivery address exists
        if (!updatedData) {
            return res.status(404).json({ message: 'Reels video not found' });
        }


        res.status(200).json({ updatedData });


    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });

    }
};