import AddReelsAdsSchema from "../schema/reels-ads-schema.js";


export const createReelsAds = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddReelsAdsSchema(data);

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


export const getAllReelsAds = async (req, res) => {

    try {

        const result = await AddReelsAdsSchema.find().sort({ index: -1 });
        res.status(200).json({result });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};



export const updateReelsAds = async (req, res) => {

    try {

        const { id } = req.params;
        const data = req.body;
       
        // Find the existing delivery address by id and update it
        const updatedData = await AddReelsAdsSchema.findByIdAndUpdate(id, data, { new: true });

        // Check if the delivery address exists
        if (!updatedData) {
            return res.status(404).json({ message: 'Reels Ads Not found' });
        }


        res.status(200).json({ updatedData });

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });

    }
};