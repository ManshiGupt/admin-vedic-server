import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AddUserRegistrationSchema } from "../schema/user-registration-schema.js";
import sendEmail from '../other/send-email.js';

export const userRegistration = async (req, res) => {
    try {
        const { name, contactNo, emailAddress, password } = req.body;

        // Check if the user already exists
        // let existingUser = await AddUserRegistrationSchema.findOne({ emailAddress });

        // if (existingUser) {
        //     return res.status(400).json({ message: "User already exists" });
        // }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user with default permissions
        const newUser = new AddUserRegistrationSchema({
            name,
            contactNo,
            emailAddress,
            password: hashedPassword,
            // You can also include default permissions here if needed
        });

        // Save the user to the database
        //await newUser.save();

        // Send email to the user
        await sendEmail({
            to: emailAddress,
            subject: 'Vedic Pandit: Registration Successful',
            message: `Hello ${name},\n\nThank you for registering with us!`,
        });

        // Generate JWT token with permissions included in payload
        const payload = {
            user: {
                id: newUser._id,
                email: newUser.emailAddress,
                name: newUser.name,
                contactNo: newUser.contactNo,
                permissions: newUser.permissions // Include user permissions here
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

export const userLogin = async (req, res) => {

    try {

        //extracting email address and password from req body
        const { emailAddress, password } = req.body;

        // Determine if the identifier is an email or contact number
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);

        // Check if the user exists
        const user = await AddUserRegistrationSchema.findOne(isEmail ? { 'emailAddress': emailAddress } : { 'contactNo': emailAddress });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token with user information
        const payload = {
            user: {
                id: user._id,
                email: user.emailAddress,
                name: user.name,
                contactNo: user.contactNo,
                permissions: user.permissions
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (error) {

        console.error('error whilce calling api', error);
        res.status(500).send('Server Error');
    }
}
