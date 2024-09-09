import AddMeditationSchema from "../schema/meditation-schema.js";

export const createMeditation = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddMeditationSchema(data);

        // Save the new document to the database
        await newData.save();

        // Return a success response with the newly created data
        res.status(200).json(newData);

    } catch (error) {

        // Handle other errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};


export const getAllMeditation = async (req, res) => {

    const { currentPage, limit} = req.query;

    try {
        
        const query = {}; // Include status in the query

       
        // Counting documents
        const totalDocumentCount = await AddMeditationSchema.countDocuments(query);
        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 10));

        const options = {
            limit: parseInt(limit, 10) || 10,
            sort: { index: 1 },
        };

        // Check if the requested page is within the valid range
        if (currentPage > totalPages) {
            return res.status(200).json({ data: [], totalPages });
        }

        options.page = currentPage;

        const result = await AddMeditationSchema.paginate(query, options);

        res.status(200).json({ data: result.docs, totalPages });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateMeditation = async (req, res) => {

    try {

        const { id } = req.params;
        const data = req.body;
       
        // Find the existing delivery address by id and update it
        const updatedData = await AddMeditationSchema.findByIdAndUpdate(id, data, { new: true });

        // Check if the delivery address exists
        if (!updatedData) {
            return res.status(404).json({ message: 'Meditation Not found' });
        }


        res.status(200).json({ updatedData});

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });

    }
};