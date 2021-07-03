const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
    filename: {
        type: String,
        require: true,
        unique: true
    },
    html: {
      type: String,
      default: ''
    },
    css: {
      type: String,
      default: ''
    },
    js: {
      type: String,
      default: ''
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: Date.now
    },
    projectId: {
      type: String
    }
});

module.exports = mongoose.models.File || mongoose.model('File', FileSchema);
