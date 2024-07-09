import axios from "axios";
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();


export const getOlaMap = async (req, res) => {
    try {
        const apiKey = process.env.OLA_MAP;
        const xRequestId = '120984lkdjj0924kdl'; // replace with your actual request ID
        const input = 'aadarsh nagar'; // replace with your actual input

        if (!apiKey) {
            throw new Error('API key is missing');
        }

        const response = await axios.get(`https://api.olamaps.io/places/v1/autocomplete?input=${input}&api_key=${apiKey}`, {
            headers: {
                'X-Request-Id': xRequestId
            }
        });

        // Handle the response
        res.status(200).json({ message: 'success', data: response.data });
    } catch (error) {
        // Handle errors
        console.error('Error getting map data', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};