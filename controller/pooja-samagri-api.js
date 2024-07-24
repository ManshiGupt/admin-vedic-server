import AddPoojaSamagriSchema from "../schema/pooja-samagri-schema.js";

export const createPoojaSamagri = async (req, res) => {

    try {

        const data = req.body;

        // Create a new document using the data from the request body
        const newData = new AddPoojaSamagriSchema(data);

        // Save the new document to the database
        const createdData = await newData.save();


        res.status(201).json(createdData);


    } catch (error) {

        // Handle other errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};


export const getAllPoojaSamagri = async (req, res) => {

    try {
        
        const { currentPage, limit, category } = req.query;

        const updatedCategory = category.replace(/\s*\(.*?\)\s*/g, '');

        // console.log(updatedCategory)

        const query = {};

       
        if (category) {
            const categories = Array.isArray(updatedCategory) ? updatedCategory : [updatedCategory];
            query['category'] = { $in: categories.map(cat => new RegExp(cat, 'i')) };
        }

        // Counting documents
        const totalDocumentCount = await AddPoojaSamagriSchema.countDocuments(query);
        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 10));

        const options = {

            limit: parseInt(limit, 10) || 10,
            // sort: { createdAt: -1 },
            select: 'title quantity _id',
            
        };


        // Check if the requested page is within the valid range
        if (currentPage > totalPages) {
            return res.status(200).json({ data: [], totalPages });
        }

        options.page = currentPage;

        const result = await AddPoojaSamagriSchema.paginate(query, options);

        res.status(200).json({ data: result.docs, totalPages });


    } catch (error) {

        res.status(500).json({ message: error.message });

    }
}


export const updatePoojaSamagri = async (req, res) => {
    try {
        const { id } = req.params; // Assuming you pass the id as a URL parameter
        const data = req.body;

        // Find the document by id and update it with the new data
        const updatedData = await AddPoojaSamagriSchema.findByIdAndUpdate(id, data, { new: true });

        if (!updatedData) {
            return res.status(404).json({ message: 'Pooja Samagri not found' });
        }

        res.status(200).json(updatedData);
    } catch (error) {
        // Handle other errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

