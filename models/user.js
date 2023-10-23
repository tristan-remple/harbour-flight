// import mongoose
const mongoose = require("mongoose");

// schema, as requested
// email regex source: https://regexr.com/3e48o
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        validate: {
            validator: function(val) {
                return val.length <= 50;
            }
        },
        required: true
    },
    lastName: {
        type: String,
        validate: {
            validator: function(val) {
                return val.length <= 50;
            }
        },
        required: true
    },
    email: {
        type: String,
        validate: {
            validator: function(val) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
            }
        },
        required: true
    },
    password: {
        type: String,
        validate: {
            validator: function(val) {
                return val.length <= 255;
            }
        },
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);