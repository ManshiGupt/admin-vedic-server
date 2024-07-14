import AddPoojaMantraSchema from "../schema/mantra-schema.js";

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
        const { searchText, currentPage, limit, category, exercise } = req.query;

        const query = {};

        if (searchText) {
            query.$or = [
                { 'title': { $regex: searchText, $options: 'i' } },
                { 'mantraBhaavaarth': { $regex: searchText, $options: 'i' } }
            ];
        }

        if (category) {
            const categories = Array.isArray(category) ? category : [category];
            query['category'] = { $in: categories.map(cat => new RegExp(cat, 'i')) };
        }

        if (exercise) {
            query['exercise'] = exercise; // Use exact match instead of regex
        }

        // Counting documents
        const totalDocumentCount = await AddPoojaMantraSchema.countDocuments(query);
        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 10));

        const options = {
            limit: parseInt(limit, 10) || 10,
            sort: { createdAt: -1 },
        };

        // Check if the requested page is within the valid range
        if (currentPage > totalPages) {
            return res.status(200).json({ data: [], totalPages });
        }

        options.page = currentPage;

        const result = await AddPoojaMantraSchema.paginate(query, options);

        res.status(200).json({ data: result.docs, totalPages: totalDocumentCount });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

