import AddPostSchema from "../schema/post-schema.js";
import AddReportPost from "../schema/report-post-schema.js";
import { createNotification } from "./notification-api.js";

// router.post('/add-post', createPost)
// router.get('/get-post', getAllPost)
// router.get('/get-post/:userId', getPostByUserId)
// router.put('/update-post/:id', updatePost)
// router.delete('/delete-post/:id', deletePost);
// router.post('/report-post', reportPost);

export const createPost = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddPostSchema(data);

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


export const getAllPost = async (req, res) => {

    const { searchText, currentPage, limit, status = 'Live' } = req.query;

    try {
        const query = { status }; // Include status in the query

        if (searchText) {
            query.$or = [
                { 'postText': { $regex: searchText, $options: 'i' } },
                { 'userName': { $regex: searchText, $options: 'i' } }
            ];
        }

        // Counting documents
        const totalDocumentCount = await AddPostSchema.countDocuments(query);
        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 10));

        const options = {
            limit: parseInt(limit, 10) || 10,
            sort: { updatedAt: -1 },
        };

        // Check if the requested page is within the valid range
        if (currentPage > totalPages) {
            return res.status(200).json({ data: [], totalPages });
        }

        options.page = currentPage;

        const result = await AddPostSchema.paginate(query, options);

        res.status(200).json({ data: result.docs, totalPages });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updatePost = async (req, res) => {

    try {

        const { id } = req.params;
        const data = req.body;
       
        // Find the existing delivery address by id and update it
        const updatedData = await AddPostSchema.findByIdAndUpdate(id, data, { new: true });

        // Check if the delivery address exists
        if (!updatedData) {
            return res.status(404).json({ message: 'Post Not found' });
        }


        // Prepare data for the notification
        const notificationDataMain = {

            userId: data.userId,
            title: 'Your post has been updated successfully.',
            pageUrl: '/(tabs)/profile/posts',
            read: false

        };


        createNotification(notificationDataMain);


        res.status(200).json({ message: 'success' });

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });

    }
};


export const deletePost = async (req, res) => {

    try {

        const { id } = req.params;

        // Find the delivery address by id and delete it
        const deletedData = await AddPostSchema.findByIdAndDelete(id);

        // Check if the delivery address exists
        if (!deletedData) {
            return res.status(404).json({ message: 'post data not found' });
        }

        // Destructure userId out of the deletedData object and use the rest for the response
        // const { userId, ...responseData } = deletedData.toObject();

        // res.status(200).json(responseData);

        res.status(200).json({ message: 'Success' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};


export const getPostByUserId = async (req, res) => {


    const { searchText, currentPage, limit } = req.query;

    try {

        const userId = req.params.userId;

        const query = { userId }; // Ensure userId is included in the query

        if (searchText) {
            query.$or = [
                { 'postText': { $regex: searchText, $options: 'i' } },
                { 'userName': { $regex: searchText, $options: 'i' } }
            ];
        }

        // Counting documents
        const totalDocumentCount = await AddPostSchema.countDocuments(query);
        const totalPages = Math.ceil(totalDocumentCount / (parseInt(limit, 10) || 10));

        const options = {
            limit: parseInt(limit, 10) || 10,
            sort: { updatedAt: -1 },
            page: parseInt(currentPage, 10) || 1
        };

        // Check if the requested page is within the valid range
        if (currentPage > totalPages) {
            return res.status(200).json({ data: [], totalPages });
        }

        const result = await AddPostSchema.paginate(query, options);

        res.status(200).json({ data: result.docs, totalPages });

    } catch (error) {
        console.error("Error fetching post by userId", error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};


export const reportPost = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddReportPost(data);

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



