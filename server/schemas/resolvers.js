const { User } = require('../models');
const {signToken } = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express');
const resolvers = {
  Query: {
    me: async (_,__,context) => {
      if(context.user)
      return await User.findOne({_id:context.user._id});
    throw new AuthenticationError('Not Logged In!')
    }
},

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent,{bookData}, context) => {

      if(context.user){
        return await User.findByIdAndUpdate({_id:context.user._id},{$push:{savedBooks:bookData}},{new:true})

      }
      throw new AuthenticationError('Must be logged In to Save Books.')
    },
    removeBook: async (parent,{bookId}, context) => {
     if(context.user) {
      return await User.findByIdAndUpdate({_id:context.user._id}, {$pull:{savedBooks:{bookId}}},{new:true})
     }
     throw new AuthenticationError('Must be logged In to remove Books.')
    }



  }
}
module.exports = resolvers