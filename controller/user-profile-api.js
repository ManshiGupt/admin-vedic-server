
import AddUserProfileSchema from '../schema/user-profile-schema.js';
import AddProfileVerification from '../schema/profile-verification-schema.js';
import { createNotification } from './notification-api.js';


//creating new user (user registration)
//test api url :http://localhost:8000/create-user/ (pass body data in json format)
export const createUser = async (req, res) => {

    const data = req.body;
    const contactNo = data.contactNo;

    try {

        // Check if the user already exists and update if it does, otherwise create a new one
        const user = await AddUserProfileSchema.findOneAndUpdate({ contactNo }, data, { new: true, upsert: true, setDefaultsOnInsert: true });


        if (data.email && data.name) {


            // Prepare data for the notification
            const notificationDataMain = {
                userId: user._id,
                title: `🌟 Welcome to Vedic Pandit! 🌟 We're thrilled to have you on board. To tailor our services to your unique needs, please take a moment to update your profile. Your insights help us provide a more personalized and enriching experience. Thank you for being a part of our community! Warm regards, The Vedic Pandit Team`,

                pageUrl: '/(tabs)/profile/edit-profile',
                read: false
            };


            createNotification(notificationDataMain);


        }


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
    const { searchText, currentPage = 1, limit = 10 } = req.query;

    try {
        const query = {};

        // Add search filters if available
        if (searchText) {
            query.$or = [
                { name: { $regex: searchText, $options: 'i' } },
                { contactNo: { $regex: searchText, $options: 'i' } },
                { email: { $regex: searchText, $options: 'i' } },
                { aadharNo: { $regex: searchText, $options: 'i' } }
            ];

            // Handle ObjectId search
            if (/^[0-9a-fA-F]{24}$/.test(searchText)) {
                query.$or.push({ _id: searchText });
            }
        }

        // Validate and sanitize pagination inputs
        const page = Math.max(parseInt(currentPage, 10), 1); // Ensure page is at least 1
        const pageSize = Math.max(parseInt(limit, 10), 1);   // Ensure limit is at least 1

        // Count total documents
        const totalDocumentCount = await AddUserProfileSchema.countDocuments(query);
        const totalPages = Math.ceil(totalDocumentCount / pageSize);

        // Check if the requested page is within the valid range
        if (page > totalPages && totalPages !== 0) {
            return res.status(200).json({ data: [], totalPages });
        }

        // Paginate results
        const options = {
            page,
            limit: pageSize,
            sort: { updatedAt: -1 },
        };

        const result = await AddUserProfileSchema.paginate(query, options);

        res.status(200).json({ data: result.docs, totalPages });
    } catch (error) {
        res.status(500).json({ message: error.message });
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


export const profileVerificationRequest = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddProfileVerification(data);

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

export const getAllProfileVerificationRequest = async (req, res) => {

    const { searchText, currentPage = 1, limit = 10 } = req.query;

    try {
        const query = {};

        // Add search filters if available
        if (searchText) {
            
            // Handle ObjectId search
            if (/^[0-9a-fA-F]{24}$/.test(searchText)) {
                query.$or.push({ _id: searchText });
            }
        }

        // Validate and sanitize pagination inputs
        const page = Math.max(parseInt(currentPage, 10), 1); // Ensure page is at least 1
        const pageSize = Math.max(parseInt(limit, 10), 1);   // Ensure limit is at least 1

        // Count total documents
        const totalDocumentCount = await AddProfileVerification.countDocuments(query);
        const totalPages = Math.ceil(totalDocumentCount / pageSize);

        // Check if the requested page is within the valid range
        if (page > totalPages && totalPages !== 0) {
            return res.status(200).json({ data: [], totalPages });
        }

        // Paginate results
        const options = {
            page,
            limit: pageSize,
            sort: { createdAt: -1 },
        };

        const result = await AddProfileVerification.paginate(query, options);

        res.status(200).json({ data: result.docs, totalPages });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



