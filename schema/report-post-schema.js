import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const ReportPost = new mongoose.Schema(

    {

        userId: { type: String, required: true},
        userName: { type: String, required: true},
        postId: { type: String, required: true},
        reportedBy: { type: String, required: true},
    
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
ReportPost.plugin(mongoosePaginate);

const AddReportPost = mongoose.model('report-post', ReportPost);

export default AddReportPost;

