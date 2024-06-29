
import AddUserProfileSchema from '../schema/user-profile-schema.js';


//creating new user (user registration)
//test api url :http://localhost:8000/create-user/ (pass body data in json format)
export const createUser = async (req, res) => {
    
    const data = req.body;
    const contactNo = data.contactNo;

    try {
        // Check if the user already exists and update if it does, otherwise create a new one
        const user = await AddUserProfileSchema.findOneAndUpdate({ contactNo }, data , { new: true, upsert: true, setDefaultsOnInsert: true });

        // Return the created or updated user
        res.status(user.isNew ? 201 : 200).json(user);

    } catch (error) {
        
        // Check if the error is a validation error
        if (error.name === 'ValidationError') {
            // Handle validation errors
            return res.status(400).json({ message: error.message });
        } else if (error.code === 11000) {
            // Handle duplicate key errors (e.g., unique constraint violation)
            return res.status(409).json({ message: 'Duplicate key error' });
        } else {
            // Handle other errors
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

//get user data by contactNo
//test api url : http://localhost:8000/user?contactNo=8700598481
export const getUserByContactNo = async (req, res) => {

    try {
        const { contactNo } = req.query;

        // Find user by contactNo
        const userData = await AddUserProfileSchema.findOne({ contactNo });

        // Respond with the user data or null
        res.status(200).json(userData || null);

    } catch (error) {
        // Respond with internal server error
        res.status(500).json({ message: 'Internal server error' });
    }
};

//get all the users
//test api url :http://localhost:8000/all-users
export const getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const allUsers = await AddUserProfileSchema.find();

        // Return the list of all users
        res.status(200).json(allUsers);

    } catch (error) {
        // Respond with internal server error if something goes wrong
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//update user data
//test api url :http://localhost:8000/update-user/66333aeea34ac547f64013fc (pass body data in json format that field you want to update)
export const updateUser = async (req, res) => {

    try {

        const { id } = req.params; // Extract user ID from request parameters
        const updateData = req.body; // Extract updated data from request body

        // Update the user with the specified ID
        const updatedUser = await AddUserProfileSchema.findByIdAndUpdate(id, updateData, { new: true });

        // Check if the user was found and updated
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the updated user data
        res.status(200).json(updatedUser);

    } catch (error) {

        // Respond with internal server error if something goes wrong
        res.status(500).json({ message: 'Internal server error', error });
    }

};

//delete user data
//test api url :http://localhost:8000/delete-user/66333aeea34ac547f64013fc
export const deleteUser = async (req, res) => {

    try {

        const { id } = req.params; // Extract user ID from request parameters

        // Find and delete the user with the specified ID
        const deletedUser = await AddUserProfileSchema.findByIdAndDelete(id);

        // Check if the user was found and deleted
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the deleted user data
        res.status(200).json(deletedUser);

    } catch (error) {

        // Respond with internal server error if something goes wrong
        res.status(500).json({ message: 'Internal server error', error });
    }
};




