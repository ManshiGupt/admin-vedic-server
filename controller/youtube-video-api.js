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

        const { searchText, currentPage, limit, category, fileType} = req.query;

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
            query['fileType'] = { $regex: fileType, $options: 'i' };
        }

        // Counting documents
        const totalDocumentCount = await AddYouTubeVideoSchema.countDocuments(query);
        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 10));

        const options = {
            
            page: currentPage > totalPages ? totalPages : currentPage,
            limit: parseInt(limit, 10) || 10,
            sort: { createdAt: -1 },
        };

        const result = await AddYouTubeVideoSchema.paginate(query, options);

        res.status(200).json({ data: result.docs, totalPages: totalDocumentCount });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
