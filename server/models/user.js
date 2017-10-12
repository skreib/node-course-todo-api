const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true,
        minlegth: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 1
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

UserSchema.methods.generateAuthToken = function () {
    "use strict";
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens.push({access, token});
    user.save().then(() => {
        return token;
    });
};

UserSchema.methods.toJson = function () {
    "use strict";
    let user = this;
    let userObject = user.toObject();
    console.log(userObject);
    return _.pick(userObject, ['_id', 'email']);
};

let User = mongoose.model('User', UserSchema);

module.exports = {User};
