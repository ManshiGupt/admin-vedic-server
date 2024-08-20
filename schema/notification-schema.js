import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const NotificationSchema = new mongoose.Schema(

    {

        title: { type: String},
        pageUrl: {type: String},
        read: {type: Boolean, default: false},
        userId: {type: String}
       
        
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
NotificationSchema.plugin(mongoosePaginate);

const AddNotificationSchema = mongoose.model('notification', NotificationSchema);

export default AddNotificationSchema;

