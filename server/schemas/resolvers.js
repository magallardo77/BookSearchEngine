const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
    Query: {
        getSingleUser: async (parent, args, context) => {
            return User.findOne({ _id: context.user._id }).populate('savedBooks')
        }
    },

    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Invalid Credentials')
            };

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Invalid Credentials')
            }
            const token = signToken(user);
            return (token, user);
        },
        saveBook: async(parent, args, context) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context._id},
                    {$addToSet: { savedBooks: args }},
                    {new: true, runValidators: true}
                )
                return updatedUser;
            } catch (err){
                return err
            }
        },

        deleteBook: async (parent, { email, password }) => {
            const updatedUser = await User.findOneAndDelete(
                { _id: context.user._id},
                {$pull: {savedBooks: {bookId: URLSearchParams.bookId}}},
                {new: true}
                );
                if (!updatedUser) {
                    throw new AuthenticationError('Invalid Credentials')
                }
                return updatedUser
        }
    }
}

module.exports = resolvers;