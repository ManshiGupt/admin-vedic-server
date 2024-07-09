import AddPanditSchema from "../schema/pandit-schema.js";

export const createVedicPandit = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddPanditSchema(data);

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

export const getAllVedicPandit = async (req, res) => {

    try {
        
        const { searchText, category, currentPage = 1 , limit = 10 } = req.query; // Default currentPage to 1 and limit to 10 if not provided

        const query = {}; // You can add conditions here if needed

        if (searchText) {
            query.$or = [
                { 'name': { $regex: searchText, $options: 'i' } },
                { 'panditTag': { $regex: searchText, $options: 'i' } }
            ];
        }

        if (category) {

            const categories = Array.isArray(category) ? category : [category];
            query['poojaNames'] = { $in: categories.map(cat => new RegExp(cat, 'i')) };
        }

        // Counting documents
        const totalDocumentCount = await AddPanditSchema.countDocuments(query);
        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 10)); // Calculate total pages

        // Check if the requested page is within the valid range
        if (currentPage > totalPages) {
            return res.status(200).json({ data: [], totalPages }); // Return empty array if currentPage exceeds totalPages
        }

        const options = {
            page: currentPage, // Current page
            limit: parseInt(limit, 10) || 10, // Number of records per page
            sort: { createdAt: -1 }, // Sorting by createdAt in descending order
        };

        const result = await AddPanditSchema.paginate(query, options); // Perform pagination query

        res.status(200).json({ data: result.docs, totalPages }); // Return paginated data and totalPages

    } catch (error) {

        res.status(500).json({ message: error.message }); // Handle any unexpected errors
    }
};

export const getPanditById = async (req, res) => {

    const panditId = req.params.panditId; 

    // console.log(panditId)


    try {
        // Find product by id
        const panditItem = await AddPanditSchema.findById(panditId);

        if (!panditItem) {
            return res.status(404).json({ message: 'Pandit not found' });
        }

        // Return the product
        res.status(200).json({ panditItem });

    } catch (error) {

        console.error('first error', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};