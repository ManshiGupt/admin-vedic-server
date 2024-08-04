import AddDeliveryAddSchema from "../schema/add-delivery-add-schema.js";

export const addDeliveryAddress = async (req, res) => {
    try {
        const data = req.body;

        const newData = new AddDeliveryAddSchema(data);
        await newData.save();

        // Destructure userId out of the newData object and use the rest for the response
        const { userId, ...responseData } = newData.toObject();

        res.status(201).json(responseData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};


export const getDeliveryAddress = async (req, res) => {
    try {
        const myUserId = req.params.userId;
        // Use find to query the database
        const response = await AddDeliveryAddSchema.find({ userId: myUserId });

        // Transform the response to remove userId from each document
        const responseData = response.map(doc => {
            const { userId, ...rest } = doc.toObject();
            return rest;
        });

        res.status(200).json(responseData);

    } catch (error) {
        console.error("Error fetching delivery address:", error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};



export const updateDeliveryAdd = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Find the existing delivery address by id and update it
        const updatedData = await AddDeliveryAddSchema.findByIdAndUpdate(id, data, { new: true });

        // Check if the delivery address exists
        if (!updatedData) {
            return res.status(404).json({ message: 'Delivery address not found' });
        }

        // Destructure userId out of the updatedData object and use the rest for the response
        const { userId, ...responseData } = updatedData.toObject();

        res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};



export const deleteDeliveryAdd = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the delivery address by id and delete it
        const deletedData = await AddDeliveryAddSchema.findByIdAndDelete(id);

        // Check if the delivery address exists
        if (!deletedData) {
            return res.status(404).json({ message: 'Delivery address not found' });
        }

        // Destructure userId out of the deletedData object and use the rest for the response
        const { userId, ...responseData } = deletedData.toObject();

        res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};
