const mongoose = require('mongoose');
const DbUserDetailsModel = mongoose.model(
    'user_details',
    new mongoose.Schema(
        {
            uuid: {
                type: String,
                required: true,
                unique: true
            },
            name: {
                type: String,
                required: true                
            },
            salary: {
                type: Number,
                required: true                
            },
            age: {
                type: Number,
                required: true                
            },
            fileName: {
                type: String,
                required: true                
            },
            fileExtension: {
                type: String,
                required: true                
            }
        },
        { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
    )
);

module.exports = DbUserDetailsModel;
