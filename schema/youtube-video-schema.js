import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const YouTubeVideoSchema = new mongoose.Schema(

    {
        title: { type: String},
        videoTime: { type: String},
        videoUrl: { type: String},
        category: { type: [String]},
        thumbnail: {type: String},
        fileType: {type: String},
        episodeNo: {type: String},
        index: {type: Number},
        
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
YouTubeVideoSchema.plugin(mongoosePaginate);

const AddYouTubeVideoSchema = mongoose.model('youtube-video', YouTubeVideoSchema);

export default AddYouTubeVideoSchema;

