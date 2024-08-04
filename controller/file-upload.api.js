import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// upload single file
export const uploadFile = async (req, res) => {

    upload.single('file') (req, res, async (err) => {


        if (err) {
            
            console.error('Error occurred while uploading file:', err);
            return res.status(500).json({ error: 'Failed to upload file.' });
        }

        if (!req.file) {

            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const { originalname, buffer } = req.file;

        const folder = process.env.AWS_FOLDER_NAME || 'uploads';

        const key = `${folder}/${originalname}`;

        const params = {

            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
            Body: buffer,
            
        };

        try {

            const uploadCommand = new PutObjectCommand(params);

            await s3Client.send(uploadCommand);
            
            const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

            //console.log('File uploaded successfully:', fileUrl);
            res.status(200).json({ message: 'File uploaded successfully.', fileUrl });

        } catch (error) {

            console.error('Error occurred while uploading to S3:', error);
            res.status(500).json({ error: 'Failed to upload file to S3.' });
        }

    });


};


export const uploadPostImage = async (req, res) => {

    upload.single('file') (req, res, async (err) => {


        if (err) {
            
            console.error('Error occurred while uploading post image:', err);

            return res.status(500).json({ error: 'Failed to upload post image.' });
        }

        if (!req.file) {

            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const { originalname, buffer } = req.file;

        const folder = process.env.AWS_FOLDER_POST || 'uploads';

        const key = `${folder}/${originalname}`;

        const params = {

            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
            Body: buffer,
            
        };

        try {

            const uploadCommand = new PutObjectCommand(params);

            await s3Client.send(uploadCommand);
            
            const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

            //console.log('File uploaded successfully:', fileUrl);
            res.status(200).json({ message: 'Post Image uploaded successfully.', fileUrl });

        } catch (error) {

            console.error('Error occurred while post image uploading to S3:', error);
            res.status(500).json({ error: 'Failed to upload post image to S3.' });
        }
        
    });


};
