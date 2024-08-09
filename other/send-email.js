import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { fromEnv } from '@aws-sdk/credential-provider-env'; // Use fromEnv to retrieve credentials from environment variables

// Create an SES client with default credential provider
const sesClient = new SESClient({
    region: process.env.AWS_REGION,
    credentials: fromEnv() // Use fromEnv to retrieve credentials from environment variables
});

// Function to send email
const sendEmail = async ({ to, subject, message }) => {
    
    const params = {

        Destination: {

            ToAddresses: [to]
        },

        Message: {

            Body: {
                Text: { Data: message }
            },

            Subject: { Data: subject }

        },

        // Source: 'noreply@devzilla.co.in' // Replace with your verified email address
        Source: 'noreply@motionofknowledge.com'

    };

    try {
        
        const command = new SendEmailCommand(params);
        const data = await sesClient.send(command);
        return data;

    } catch (error) {
        
        console.error("Error sending email:", error);
        throw error;
    }
};

export default sendEmail;
