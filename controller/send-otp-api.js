import axios from "axios";

export const sendOTP = async (req, res) => {

    const { phoneNumber } = req.body;

    try {

        // Generate a random 6-digit OTP
        //const generateOTP = Math.floor(100000 + Math.random() * 900000);

        // Prepare the request data
        const requestData = {

            phoneNumber: phoneNumber,
            otpLength: 6,
            channel: 'SMS',
            expiry: 60
        };

        // Make the HTTP POST request to send the OTP
        const response = await axios.post('https://auth.otpless.app/auth/otp/v1/send', requestData, {

            headers: {

                clientId: '255RT1ZKHL7K7LDBU332FKLV3K4T4ARE',
                clientSecret: '52ybhvaztuc5227mhabfktde2x3cy6t9',
                'Content-Type': 'application/json'
            }

        });

        // Handle the response
        res.status(200).json({ message: 'OTP sent successfully:', data: response.data });


        //console.log('my otp',generateOTP)
        // { orderId: 'Otp_E256488EA9384AFFA2D815392DAF9587' }


    } catch (error) {
        // Handle errors
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


export const verifyOTP = async (req, res) => {
    try {
        // Extract data from the request body
        const { orderId, otp, phoneNumber } = req.body;

        // Prepare the request data
        const requestData = {
            orderId,
            otp,
            phoneNumber
        };

        // Make an HTTP POST request to verify the OTP
        const response = await axios.post('https://auth.otpless.app/auth/otp/v1/verify', requestData, {
            headers: {
                clientId: '255RT1ZKHL7K7LDBU332FKLV3K4T4ARE',
                clientSecret: '52ybhvaztuc5227mhabfktde2x3cy6t9',
                'Content-Type': 'application/json'
            }
        });

        // Handle the response
        console.log('OTP verification response:', response.data);
        res.status(200).json({ message: 'OTP verified successfully', data: response.data });

    } catch (error) {
        // Handle errors
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


export const resendOTP = async (req, res) => {
    try {
        // Extract orderId from the request body
        const { orderId } = req.body;

        // Prepare the request data
        const requestData = {
            orderId
        };

        // Make an HTTP POST request to resend the OTP
        const response = await axios.post('https://auth.otpless.app/auth/otp/v1/resend', requestData, {
            headers: {
                clientId: '255RT1ZKHL7K7LDBU332FKLV3K4T4ARE',
                clientSecret: '52ybhvaztuc5227mhabfktde2x3cy6t9',
                'Content-Type': 'application/json'
            }
        });

        // Handle the response
        console.log('Resend OTP response:', response.data);
        res.status(200).json({ message: 'OTP resent successfully', data: response.data });

    } catch (error) {
        // Handle errors
        console.error('Error resending OTP:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


