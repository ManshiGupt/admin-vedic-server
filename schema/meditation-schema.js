import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const MeditationSchema = new mongoose.Schema(

    {
        thumbnailUrl: { type: String, required: true},
        index: {type: Number, required: true},
        subTitle: { type: String, required: true },
        title: {type: String, required: true},
        lyrics: {type: String},
        audioFileLink: {type: String, default: ''},
        fileType: {type: String, required: true},
        youtubeUrl: {type: String, default: ''}
        
    },

    {
        timestamps: true
    }

);

//plugin pagination to schema
MeditationSchema.plugin(mongoosePaginate);

const AddMeditationSchema = mongoose.model('meditation', MeditationSchema);

export default AddMeditationSchema;

