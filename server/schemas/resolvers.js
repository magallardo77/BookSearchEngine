const {AuthenticationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth');
const {User} = require('../models');

const resolvers {
    Query: {
        getSingleUser: async(parent, args, context) => {
           return User.findOne({_id: context.user._id}).populate('savedBooks')
        }
    },

    Mutation: async (parent, args) => {
        const user = await User.create(args)
        const token = signToken(user)
        return{token, user};
    },
    login: async (parent, {email, password}) => {
        const user = await User.findOne({email});

        if(!user) {
            throw new AuthenticationError('Invalid Credentials')
        }
    }
}

module.exports = resolvers;