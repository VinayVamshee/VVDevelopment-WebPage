const mongoose = require('mongoose');

const SiteSchema = new mongoose.Schema({
    SiteName: {
        type: String,
        required: true,
    },
    SiteUrl: {
        type: String,
        required: true,
    },
    SiteLogo: {
        type: String,
        required: true,
    },
    SiteCategory: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Site', SiteSchema);