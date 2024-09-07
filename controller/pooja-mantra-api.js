import AddPoojaMantraSchema from "../schema/mantra-schema.js";
import AddBookMarkMantraSchema from "../schema/bookmark-mantra-schema.js";

//creating new user (user registration)
export const createPoojaMantra = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddPoojaMantraSchema(data);

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


export const getAllPoojaMantra = async (req, res) => {

    try {

        const { searchText, currentPage, limit, category, exercise, userId } = req.query;

        const query = {};

        // Add search filters if available
        if (searchText) {
            query.$or = [
                { title: { $regex: searchText, $options: 'i' } },
                { mantraBhaavaarth: { $regex: searchText, $options: 'i' } }
            ];
        }

        if (category) {
            const categories = Array.isArray(category) ? category : [category];
            query['category'] = { $in: categories.map(cat => new RegExp(cat, 'i')) };
        }

        if (exercise) {
            query['exercise'] = exercise; // Use exact match for exercise
        }

        // Counting documents
        const totalDocumentCount = await AddPoojaMantraSchema.countDocuments(query);
        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 10));

        const options = {

            limit: parseInt(limit, 10) || 10,
            sort: { createdAt: -1 },
            page: parseInt(currentPage, 10) || 1

        };

        // Check if the requested page is within the valid range
        if (currentPage > totalPages) {
            return res.status(200).json({ data: [], totalPages });
        }

        const result = await AddPoojaMantraSchema.paginate(query, options);
        const mantras = result.docs;

        // If userId is provided, check bookmarks for each mantra
        let bookmarks = [];

        if (userId) {

            const mantraIds = mantras.map(mantra => mantra._id);

            bookmarks = await AddBookMarkMantraSchema.find({

                userId: userId,
                mantraId: { $in: mantraIds }

            }).select('mantraId'); // Retrieve only mantraId from the bookmark collection
        }

        const bookmarkedMantraIds = bookmarks.map(bookmark => bookmark.mantraId.toString());


        // console.log('bookmark', bookmarkedMantraIds)

        // Add bookmark flag to each mantra
        const mantrasWithBookmarks = mantras.map(mantra => ({

            ...mantra.toObject(),
            bookmark: bookmarkedMantraIds.includes(mantra._id.toString()) // true if bookmarked, false otherwise

        }));

        res.status(200).json({ data: mantrasWithBookmarks, totalPages: totalDocumentCount });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};



export const updatePoojaMantra = async (req, res) => {

    try {

        const { id } = req.params; // Assuming you pass the id as a URL parameter
        const data = req.body;

        // Find the document by id and update it with the new data
        const updatedData = await AddPoojaMantraSchema.findByIdAndUpdate(id, data, { new: true });

        if (!updatedData) {
            return res.status(404).json({ message: 'Pooja Mantra not found' });
        }

        res.status(200).json(updatedData);

    } catch (error) {

        // Handle other errors
        res.status(500).json({ message: 'Internal server error', error });

    }
};

