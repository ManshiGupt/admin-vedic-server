import AddDailyQuteSchema from "../schema/daily-qute-schema.js";


export const createDailyQuote = async (req, res) => {

    const data = req.body;

    //console.log('data-log',data)

    try {

        // Create a new document using the data from the request body
        const newData = new AddDailyQuteSchema(data);

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


export const getQuoteOfTheDay = async (req, res) => {

    try {

        const { date } = req.query;

        // Query the database for a quote with the specified date
        const quote = await AddDailyQuteSchema.findOne({ date });

        // if (!quote) {
        //     return res.status(404).json({ message: 'Quote not found for the specified date.' });
        // }

        res.status(200).json(quote);

    } catch (error) {

        // console.error(error);
        res.status(500).json({ message: 'Internal server error', error });

    }

};