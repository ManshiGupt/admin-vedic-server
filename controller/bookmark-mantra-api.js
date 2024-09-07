import AddBookMarkMantraSchema from "../schema/bookmark-mantra-schema.js";
import AddPoojaMantraSchema from "../schema/mantra-schema.js";

//creating new user (user registration)
export const createBookmarkMantra = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddBookMarkMantraSchema(data);

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


export const getAllBookmarkByUserId = async (req, res) => {

    const { currentPage, limit, userId } = req.query;
   
    try {

        const query = { userId };

        // Counting documents
        const totalDocumentCount = await AddBookMarkMantraSchema.countDocuments(query);
        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 10));

        const options = {

            limit: parseInt(limit, 10) || 10,
            sort: { updatedAt: -1 },
            page: parseInt(currentPage, 10) || 1

        };

        // Check if the requested page is within the valid range
        if (currentPage > totalPages) {
            return res.status(200).json({ data: [], totalPages });
        }

        // Fetching bookmarks and populating the related PoojaMantraSchema data
        const result = await AddBookMarkMantraSchema.paginate(query, options).then(async (res) => {

            const populatedDocs = await AddBookMarkMantraSchema.populate(res.docs, {

                path: 'mantraId', // This should match the mantra reference field in AddBookMarkMantraSchema
                model: AddPoojaMantraSchema, // The model you're populating from
                select: 'title mantra mantraBhaavaarth mantraShabdaarth category shlokNo index exercise source'
            });

            return populatedDocs;

        });


        res.status(200).json({ data: result, totalPages });

    } catch (error) {
        console.error("Error fetching mantra bookmark userId", error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};


export const deleteBookmarkMantra = async (req, res) => {

    try {

        const { id } = req.params;

        // console.log(id);

        // Find the bookmark by mantraId and delete it
        const deletedData = await AddBookMarkMantraSchema.findOneAndDelete({ mantraId: id });

        // Check if the bookmark exists
        if (!deletedData) {
            console.log('data not found');
            return res.status(404).json({ message: 'Bookmark mantra not found' });
        }

        // Return a success message
        res.status(200).json({ message: 'Bookmark deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};
