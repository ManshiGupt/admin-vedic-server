import AddPoojaBookingSchema from "../schema/pooja-booking-schema.js";

//creating new user (user registration)
export const createPoojaBooking = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddPoojaBookingSchema(data);

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


export const getAllPoojaBooking = async (req, res) => {

    try {

        const { userId } = req.query;

        // console.log(userId)

        // Build the query to filter bookings by userId in userDetails array
        const query = { 'userDetails._id': userId };

        // Fetch the results from the database using the constructed query
        const result = await AddPoojaBookingSchema.find(query);

        res.status(200).json({ data: result });

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};


export const updatePoojaBooking = async (req, res) => {

    try {

        const { id } = req.params; // Assuming you pass the id as a URL parameter
        const data = req.body;

        // Find the document by id and update it with the new data
        const updatedData = await AddPoojaBookingSchema.findByIdAndUpdate(id, data, { new: true });

        if (!updatedData) {
            return res.status(404).json({ message: 'Pooja booking not found' });
        }

        res.status(200).json(updatedData);
        
    } catch (error) {
        // Handle other errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};