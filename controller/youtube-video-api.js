import AddYouTubeVideoSchema from "../schema/youtube-video-schema.js";

//creating new user (user registration)
export const createYouTubeVideo = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddYouTubeVideoSchema(data);

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

export const getAllYoutubeVideo = async (req, res) => {


    try {

        const { searchText, currentPage, limit, category, fileType } = req.query;

        const query = {};

        if (searchText) {
            query.$or = [
                { 'title': { $regex: searchText, $options: 'i' } },
                // { 'descriptions': { $regex: searchText, $options: 'i' } }
            ];
        }

        if (category) {

            const categories = Array.isArray(category) ? category : [category];
            query['category'] = { $in: categories.map(cat => new RegExp(cat, 'i')) };
        }

        if (fileType) {

            const fileTypes = Array.isArray(fileType) ? fileType : [fileType];
            query['fileType'] = { $in: fileTypes.map(file => new RegExp(file, 'i')) };
        }

        // Counting documents
        const totalDocumentCount = await AddYouTubeVideoSchema.countDocuments(query);
        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 10));


        const options = {

            limit: parseInt(limit, 10) || 10,
            sort: { createdAt: -1 },
        };


        // Check if the requested page is within the valid range
        if (currentPage > totalPages) {
            return res.status(200).json({ data: [], totalPages });
        }

        // console.log('current page', currentPage)

        // console.log('limit', (parseInt(limit, 10) || 10))
        // console.log('dcoument count', totalDocumentCount)
        // console.log('total page', totalPages)

        // This is necessary because the paginate method of the AddYouTubeVideoSchema
        // expects the options object to have a page property that specifies which page of results to return.

        options.page = currentPage;


        const result = await AddYouTubeVideoSchema.paginate(query, options);

        res.status(200).json({ data: result.docs, totalPages: totalDocumentCount });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateYoutubeVideo = async (req, res) => {

    try {

        const { id } = req.params;
        const data = req.body;

        const updatedData = await AddYouTubeVideoSchema.findByIdAndUpdate(id, data, { new: true });

        if (!updatedData) {
            return res.status(404).json({ message: 'Youtube video not found' });
        }

        res.status(200).json(updatedData);
        
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
        
    }
}


export const deleteYoutubeVideo = async (req, res) => {

    try {

        const { id } = req.params;

        // Find the delivery address by id and delete it
        const deletedData = await AddYouTubeVideoSchema.findByIdAndDelete(id);

        // Check if the delivery address exists
        if (!deletedData) {
            return res.status(404).json({ message: 'data not found' });
        }

        res.status(200).json({ message: 'Success' });

    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};