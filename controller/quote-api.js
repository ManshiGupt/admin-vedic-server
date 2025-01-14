import AddQuoteSchema from "../schema/quote-schema.js";


export const createQuote = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddQuoteSchema(data);

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

export const getAllQuotes = async (req, res) => {
    try {
        const { searchText, currentPage, limit, category } = req.query;

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

        // Counting documents
        const totalDocumentCount = await AddQuoteSchema.countDocuments(query);
        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 10));

        const options = {
            limit: parseInt(limit, 10) || 10,
            sort: { createdAt: -1 },
        };

        // console.log('current page', currentPage)
        // console.log('limit', (parseInt(limit, 10) || 10))
        // console.log('dcoument count', totalDocumentCount)
        // console.log('total page', totalPages)

        // Check if the requested page is within the valid range
        if (currentPage > totalPages) {
            return res.status(200).json({ data: [], totalPages });
        }

        options.page = currentPage;

        const result = await AddQuoteSchema.paginate(query, options);

        res.status(200).json({ data: result.docs, totalPages });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateQuote = async (req, res) => {
    
    const { id } = req.params;
    const data = req.body;

    try {
        // Find the document by ID and update it with the new data
        const updatedData = await AddQuoteSchema.findByIdAndUpdate(id, data, { new: true });

        if (!updatedData) {
            return res.status(404).json({ message: 'Quote not found' });
        }

        // Return the updated data
        res.status(200).json(updatedData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};


export const deleteQuote = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the document by ID and delete it
        const deletedData = await AddQuoteSchema.findByIdAndDelete(id);

        if (!deletedData) {
            return res.status(404).json({ message: 'Quote not found' });
        }

        // Return a success message
        res.status(200).json({ message: 'Quote deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};
