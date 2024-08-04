import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const PostSchema = new mongoose.Schema(

    {

        userId: { type: String, required: true},
        profilePic: { type: String, required: true},
        userName: { type: String, required: true},
        postImage: { type: String},
        postText: { type: String},
        status: {type: String, default: 'Under Review'},
        statusRemark: {type: String, default: "Thanks for your submission! Our team is reviewing your post to ensure it aligns with our guidelines. We'll update your post status shortly. Appreciate your patience!"} 
       
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
PostSchema.plugin(mongoosePaginate);

const AddPostSchema = mongoose.model('post', PostSchema);

export default AddPostSchema;

