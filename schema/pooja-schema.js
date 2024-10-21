import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const faqSchema = new mongoose.Schema(

    {
        title: { type: String, required: true },
        descriptions: { type: String, required: true },
        index: { type: Number, required: true }
    },
);

const poojaBookPdf = new mongoose.Schema(

    {
        title: { type: String, required: true },
        pdfUrl: { type: String, required: true },
        index: { type: Number, required: true }

    },

);

const poojaBlog = new mongoose.Schema(

    {
        title: { type: String, required: true },
        pageUrl: { type: String, required: true },
        thumbnail: { type: String, required: true },
        index: { type: Number, required: true }
    },
    
);


const PoojaSchema = new mongoose.Schema(

    {

        images: { type: [String], required: true },
        title: { type: String, required: true },

        subtitle: { type: String, required: true },
        date: {type: String},   

        // oldPrice: { type: String, required: true },
        // newPrice: { type: String, required: true },

        poojaTag: { type: String, required: true },

        poojaDuration: {type: Number, required: true},
        tithi: { type: String},

        aboutPooja: { type: String, required: true },
        category: { type: [String], required: true },

        visibility: { type: Boolean, required: true },
        index: { type: Number, required: true },
        panditNo: {type: Number, required: true},

        faq: { type: [faqSchema], required: true },
        poojaBookPdf: { type: [poojaBookPdf], required: true },
        poojaBlog: { type: [poojaBlog], required: true },

    },

    {
        timestamps: true
    }
);

// Plugin pagination to schema
PoojaSchema.plugin(mongoosePaginate);

const AddPoojaSchema = mongoose.model('pooja', PoojaSchema);

export default AddPoojaSchema;
