import AddFaqHelpSchema from "../schema/faq-help-schema.js";

//creating new user (user registration)
export const createFaqHelp = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddFaqHelpSchema(data);

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

// export const getAllFaq = async (req, res) => {

//     try {

//         const allUsers = await AddFaqHelpSchema.find();

//         res.status(200).json(allUsers);

//     } catch (error) {

//         res.status(201).json({ message: 'internal server error', error })

//     }
// }

export const deleteFaq = async (req, res) => {

    try {

        //extract faq id from request params
        const { id } = req.params;

        //find and delete specific faq by id
        const deleteFaq = await AddFaqHelpSchema.findByIdAndDelete(id);

        //if faq not found with the same id

        if (!deleteFaq) {

            return res.status(404).json({ message: 'faq not found' })
        }

        //return deleted faq data

        return res.status(200).json(deleteFaq);


    } catch (error) {

        res.status(500).json({ message: 'internal server error', error })

    }
}

export const updateFaq = async (req, res) => {

    try {

        //extract id from params
        const { id } = req.params;

        //extract edited data from body
        const updatedData = req.body;

        // update faq
        const updateFaqData = await AddFaqHelpSchema.findByIdAndUpdate(id, updatedData, { new: true });

        //if id not found
        if (!updateFaqData) {

            res.status(404).json({ message: 'Item Not Found' })

        }

        //return updated data
        res.status(200).json(updateFaqData)


    } catch (error) {

        res.status(500).json({ message: 'internal server error', error })

    }
}

export const getAllFaq = async (req, res) => {


    try {

        const { startDate, endDate, searchText, currentPage, limit, filterData } = req.query;

        const query = {};

        // Convert startDate and endDate to ISODate format
        const startDateTime = new Date(startDate);
        startDateTime.setHours(0, 0, 0, 0); // Set time to midnight

        const endDateTime = new Date(endDate);
        endDateTime.setHours(23, 59, 59, 999); // Set time to end of day


        //gte - greater then equal to // lte - less then equal to
        if (startDate && endDate) {
            query.createdAt = { $gte: startDateTime, $lte: endDateTime };
        }

        if (searchText) {
            query.$or = [
                { 'title': { $regex: searchText, $options: 'i' } },
                { 'descriptions': { $regex: searchText, $options: 'i' } }
            ];
        }

        if (filterData && filterData.category) {
            query['category'] = { $regex: filterData.category, $options: 'i' };
        }

        //counting documents
        const totalDocumentCount = await AddFaqHelpSchema.countDocuments(query);

        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 10));

        const options = {

            page: currentPage > totalPages ? totalPages : currentPage,
            limit: parseInt(limit, 10) || 10,
            sort: { createdAt: -1 },

        };

        const result = await AddFaqHelpSchema.paginate(query, options);

        res.status(200).json({ data: result.docs, totalPages: totalPages });


    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}




