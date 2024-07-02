import AddPoojaCategory from "../schema/pooja-category-schema.js";

//creating new user (user registration)
export const createPoojaCategory = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddPoojaCategory(data);

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

export const getAllPoojaCategory = async (req, res) => {
    try {

        // Fetch all users from the database
        const response = await AddPoojaCategory.find();

        // Return the list of all users
        res.status(200).json(response);

    } catch (error) {
        // Respond with internal server error if something goes wrong
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
