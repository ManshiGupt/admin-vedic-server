import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const BlogSchema = new mongoose.Schema(

    {

        title: { type: String, required: true},
        thumbnail: { type: String, required: true},
        pageUrl: { type: String, required: true},
        index: { type: Number, required: true},
        category: { type: [String], required: true},
       
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
BlogSchema.plugin(mongoosePaginate);

const AddBlogSchema = mongoose.model('blog', BlogSchema);

export default AddBlogSchema;

