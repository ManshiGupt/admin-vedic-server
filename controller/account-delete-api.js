import AddAccountDeleteSchema from "../schema/account-delete-schema.js";


export const createDeleteAccountRequest = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddAccountDeleteSchema(data);

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


export const getDeletedAccountInfo = async (req, res) => {
    try {
        const { contactNo } = req.query;

        // Validate that contactNo is provided
        if (!contactNo) {
            return res.status(400).json({ message: 'Contact number is required' });
        }

        // Find user by contactNo
        const userData = await AddAccountDeleteSchema.findOne({ 'userDetails.contactNo': contactNo });

        if (userData) {

            // Respond with the user data or null
            res.status(200).json(userData);

        }else{
            res.status(201).json({message: 'Data Not Found'})
        }



    } catch (error) {
        // Respond with internal server error
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


export const deleteDeletedAccountRequest = async (req, res) => {

    try {

        const { id } = req.params;

        // Find the delivery address by id and delete it
        const deletedData = await AddAccountDeleteSchema.findByIdAndDelete(id);

        // Check if the delivery address exists
        if (!deletedData) {
            return res.status(404).json({ message: 'account delete request data not found' });
        }


        res.status(200).json({ message: 'Success' });

    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};