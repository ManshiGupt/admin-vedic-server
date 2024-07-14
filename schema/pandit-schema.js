import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const faqSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        descriptions: { type: String, required: true },
        index: { type: Number, required: true }
    },
);

const videoUrl = new mongoose.Schema(

    {
        title: { type: String, required: true },
        thumbnail: { type: String, required: true },
        videoUrl: { type: String, required: true },
        index: { type: Number, required: true }
    },

);

const panditBlog = new mongoose.Schema(

    {
        title: { type: String, required: true },
        pageUrl: { type: String, required: true },
        thumbnail: { type: String, required: true },
        index: { type: Number, required: true }
    },
    
);

const poojaNames = new mongoose.Schema(

    {
        poojaId: { type: String, required: true },
        poojaName: { type: String, required: true },
        oldPrice: { type: String, required: true },
        newPrice: { type: String, required: true },
        imageUrl: {type: String, required: true}
    },
    
);


const PanditSchema = new mongoose.Schema(

    {
        name: { type: String, required: true },
        profileImage: { type: String, required: true },
        experience: { type: String, required: true },
        language: { type: [String], required: true },
        education: { type: [String], required: true },
        visibility: { type: Boolean, required: true },
        index: { type: Number, required: true },
        verified: { type: Boolean, required: true },
        panditTag: { type: String, required: true },
        location: { type: String, required: true },
        about: { type: String, required: true },

        faq: { type: [faqSchema], required: true },
        videoUrl: { type: [videoUrl], required: true },
        panditBlog: { type: [panditBlog], required: true },
        poojaNames: { type: [poojaNames], required: true },

    },
    
    {
        timestamps: true
    }
);

// Plugin pagination to schema
PanditSchema.plugin(mongoosePaginate);

const AddPanditSchema = mongoose.model('vedic-pandit', PanditSchema);

export default AddPanditSchema;
