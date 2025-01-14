import AddHomePageBannerSchema from "../schema/home-page-banner-schema.js";
import AddPoojaCategory from "../schema/pooja-category-schema.js";
import AddPoojaSchema from "../schema/pooja-schema.js";
import AddYouTubeVideoSchema from "../schema/youtube-video-schema.js";
import AddPanditSchema from "../schema/pandit-schema.js";
import AddQuoteSchema from "../schema/quote-schema.js";
import Product from "../schema/add-product-schema.js";
import AddBlogSchema from "../schema/blog-schema.js";
import AddShortVideoSchema from "../schema/short-video-schema.js";
import AddHomePageFeedback from "../schema/home-testimonial.js";
import AddFeedbackReview from "../schema/feedback-review-schema.js";
import AddMeditationSchema from "../schema/meditation-schema.js";

export const getHomePageDataApi = async (req, res) => {

    try {

        const { currentPage = 1, limit = 15 } = req.query;

        const options = { limit: parseInt(limit), skip: (currentPage - 1) * limit };

        const [banners, poojaCategories, poojas, bhajanVideos, satsangVideos, pandits, quotes, products, blogs, shortVideos, homePageFeedback, meditation] = await Promise.all([

            AddHomePageBannerSchema.find({}, null, options),
            AddPoojaCategory.find({}, null, options),

            // Sorting by 'index' in descending order
            AddPoojaSchema.find({ visibility: true }, null, options).select('_id images title subtitle date tithi visibility index').sort({ index: -1 }),

            AddYouTubeVideoSchema.find({ fileType: 'Bhajan' }, null, options),
            AddYouTubeVideoSchema.find({ fileType: 'Satsang' }, null, options),

            AddPanditSchema.find({visibility: true}, null, options).select('_id name profileImage experience language education visibility index verified location'),

            AddQuoteSchema.find({}, null, options),

            Product.find({}, null, options).select('_id images title oldPrice newPrice visibility index'),

            AddBlogSchema.find({}, null, options),
            AddShortVideoSchema.find({}, null, options).sort({ index: -1 }),
            AddHomePageFeedback.find({}, null, options),
            AddMeditationSchema.find({}, null, options).sort({ index: 1 })

        ]);

        // Calculate average star rating for each pandit
        const panditsWithAvgStars = await Promise.all(pandits.map(async (pandit) => {

            const feedbackReviews = await AddFeedbackReview.find({ panditId: pandit._id });
            const totalStars = feedbackReviews.reduce((total, review) => total + review.stars, 0);
            const avgStars = feedbackReviews.length ? (totalStars / feedbackReviews.length).toFixed(1) : 0;

            return { ...pandit.toObject(), avgStars };

        }));

        res.status(200).json({

            banners,
            poojaCategories,
            poojas,
            bhajanVideos,
            satsangVideos,
            pandits: panditsWithAvgStars,
            quotes,
            products,
            blogs,
            shortVideos,
            homePageFeedback,
            meditation,
            appVersion: '1.0.1'

        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
