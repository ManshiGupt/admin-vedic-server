import mongoose from "mongoose";

// Define user registration schema with default values for permissions
const userRegistrationSchema = new mongoose.Schema({
    name: String,
    contactNo: String,
    emailAddress: String,
    password: String,
    role: {type: String, default: 'user'},
    permissions: {
        faq: {
            create: {
                type: Boolean,
                default: true // Set default value for faq create permission
            },
            read: {
                type: Boolean,
                default: true // Set default value for faq read permission
            },
            update: {
                type: Boolean,
                default: false // Set default value for faq update permission
            },
            delete: {
                type: Boolean,
                default: false // Set default value for faq delete permission
            },
            download: {
                type: Boolean,
                default: false // Set default value for faq download permission
            }
        },
        mantra: {
            create: {
                type: Boolean,
                default: true // Set default value for mantra create permission
            },
            read: {
                type: Boolean,
                default: true // Set default value for mantra read permission
            },
            update: {
                type: Boolean,
                default: false // Set default value for mantra update permission
            },
            delete: {
                type: Boolean,
                default: false // Set default value for mantra delete permission
            },
            download: {
                type: Boolean,
                default: false // Set default value for mantra download permission
            }
        },
        order: {
            create: {
                type: Boolean,
                default: true // Set default value for order create permission
            },
            read: {
                type: Boolean,
                default: true // Set default value for order read permission
            },
            update: {
                type: Boolean,
                default: false // Set default value for order update permission
            },
            delete: {
                type: Boolean,
                default: false // Set default value for order delete permission
            },
            download: {
                type: Boolean,
                default: false // Set default value for order download permission
            }
        }
    }
});

// Define User model
const AddUserRegistrationSchema = mongoose.model('User-Registration', userRegistrationSchema);

export { AddUserRegistrationSchema };
