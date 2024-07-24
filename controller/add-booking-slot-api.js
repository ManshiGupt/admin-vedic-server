import AddBookingSlotSchema from "../schema/booking-slot-schema.js";

export const createBookingSlot = async (req, res) => {

  const data = req.body;

  //console.log('data-log',data)

  try {

    // Create a new document using the data from the request body
    const newData = new AddBookingSlotSchema(data);

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


export const getAllBookingSlots = async (req, res) => {


  try {


    // const { panditId, poojaId, slotDate } = req.query;

    const { panditId, slotDate } = req.query;

    if (!panditId || !slotDate) {

      return res.status(400).json({ message: 'panditId and slotDate are required query parameters' });

    }

    // console.log('Fetching booking slots for panditId:', panditId, 'poojaId:', poojaId, 'and slotDate:', slotDate);

    const query = {

      panditId: panditId,
      // poojaId: poojaId,
      slotDate: slotDate

    };

    const response = await AddBookingSlotSchema.find(query);

    if (response.length === 0) {

      // console.log('No booking slots found for the given criteria.');

    }

    res.status(200).json(response);


  } catch (error) {

    console.error('Error fetching booking slots:', error);
    res.status(500).json({ message: error.message });
  }
};


export const updateBookingSlots = async (req, res) => {

  try {

      const { id } = req.params; // Assuming you pass the id as a URL parameter
      const data = req.body;

      // Find the document by id and update it with the new data
      const updatedData = await AddBookingSlotSchema.findByIdAndUpdate(id, data, { new: true });

      if (!updatedData) {
          return res.status(404).json({ message: 'Slot booking not found' });
      }

      res.status(200).json(updatedData);
      
  } catch (error) {
      // Handle other errors
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error });
  }
};