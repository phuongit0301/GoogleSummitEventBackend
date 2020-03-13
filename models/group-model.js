const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema(
    {
        name: { type: String, required: true },
        isUsed: { type: Boolean, default: false },
        excelPosition: { type: Number, default: 0 }
    },
    { timestamps: true },
)

module.exports = mongoose.model('groups', GroupSchema)