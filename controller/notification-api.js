import AddNotificationSchema from "../schema/notification-schema.js";

export const createNotification = async (data) => {

   
    try {

        // Create a new document using the data from the request body
        const newData = new AddNotificationSchema(data);

        // Save the new document to the database
        const response = await newData.save();

        // console.log(response)


    } catch (error) {

        // Handle other errors
        console.error(error);
       
    }
};


export const getAllNotification = async (req, res) => {


    const { currentPage = 1, limit = 15, read = 'false', userId } = req.query;

    try {

        const query = { read, userId }; // Include status in the query


        // Counting documents
        const totalDocumentCount = await AddNotificationSchema.countDocuments(query);
        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 10));

        const options = {
            limit: parseInt(limit, 10) || 10,
            sort: { updatedAt: -1 },
        };

        // Check if the requested page is within the valid range
        if (currentPage > totalPages) {
            return res.status(200).json({ data: [], totalPages });
        }

        options.page = currentPage;

        const result = await AddNotificationSchema.paginate(query, options);

        res.status(200).json({ data: result.docs, totalPages });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};


export const updateNotification = async (req, res) => {

    try {

        const { id } = req.params;
        const data = req.body;

        // Find the existing delivery address by id and update it
        const updatedData = await AddNotificationSchema.findByIdAndUpdate(id, data, { new: true });

        // Check if the delivery address exists
        if (!updatedData) {
            return res.status(404).json({ message: 'Notification Not found' });
        }


        res.status(200).json({ message: 'success' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};


export const getTotalNotificationNos = async (req, res) => {

    const { read = 'false', userId } = req.query;

    // Validate query parameters
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const query = { read, userId };

        // Counting documents
        const totalDocumentCount = await AddNotificationSchema.countDocuments(query);

        res.status(200).json({ data: totalDocumentCount });
    } catch (error) {
        console.error('Error counting documents:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


