import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const bhagwanImage = new mongoose.Schema(

    {
        title: { type: String, required: true },
        imageUrl: { type: String, required: true },
        index: { type: Number, required: true },
        category: {type: String}
    },
);



const PhotoGallery = new mongoose.Schema(

    {

        title: { type: String, required: true },
        index: {type: String, required: true},
        images: { type: [bhagwanImage], required: true },
       
    },

    {
        timestamps: true
    }
);

// Plugin pagination to schema
PhotoGallery.plugin(mongoosePaginate);

const AddPhotoGallery = mongoose.model('photo-gallery', PhotoGallery);

export default AddPhotoGallery;
