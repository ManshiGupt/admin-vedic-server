import axios from "axios";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getPanchang = async (req, res) => {
    const { date, month, year } = req.body;

    try {
        // Prepare the request data
        const requestData = {
            "year": year,
            "month": month,
            "date": date,
            "hours": 6, // Add the missing hours field
            "minutes": 0,
            "seconds": 0,
            "latitude": 17.38333,
            "longitude": 78.4666,
            "timezone": 5.5,
            "config": {
                "observation_point": "topocentric",
                "ayanamsha": "lahiri"
            }
        };

        // Make the HTTP POST request to send the OTP
        const response = await axios.post('https://json.freeastrologyapi.com/tithi-durations', requestData, {
            headers: {
                'x-api-key': process.env.PANCHANG_API,
                'Content-Type': 'application/json'
            }
        });

        // Handle the response
        res.status(200).json({ message: 'success', data: response.data });

    } catch (error) {
        // Handle errors
        console.error('Error getting panchang data', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};