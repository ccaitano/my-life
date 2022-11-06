const { AuthenticationError } = require('apollo-server-express');
const { User, Task } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('tasks');
    },
    user: async (parent, { email }) => {
      return User.findOne({ email }).populate('tasks');
    },
    
    tasks: async (parent, { email }) => {
      const params = email ? { email } : {};
      return Task.find(params).sort({ createdAt: -1 });
    },
    task: async (parent, { taskId }) => {
      return Task.findOne({ taskId: taskId });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('tasks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    

  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, location, email, password }) => {
      const user = await User.create({ firstName, lastName, location, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addTask: async (parent, { taskText }, context) => {
      if (context.user) {
        const task = await Task.create({ taskText });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { tasks: task._id} }
        );

        return task;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // addComment: async (parent, { thoughtId, commentText }, context) => {
    //   if (context.user) {
    //     return Thought.findOneAndUpdate(
    //       { _id: thoughtId },
    //       {
    //         $addToSet: {
    //           comments: { commentText, commentAuthor: context.user.username },
    //         },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    removeTask: async (parent, { taskId }, context) => {
      if (context.user) {
        const task = await Task.findOneAndDelete({
          _id: taskId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { tasks: task._id } }
        );

        return task;
      
      };
      throw new AuthenticationError('You need to be logged in!');
    },
    // removeComment: async (parent, { thoughtId, commentId }, context) => {
    //   if (context.user) {
    //     return Thought.findOneAndUpdate(
    //       { _id: thoughtId },
    //       {
    //         $pull: {
    //           comments: {
    //             _id: commentId,
    //             commentAuthor: context.user.username,
    //           },
    //         },
    //       },
    //       { new: true }
    //     );
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
  },
};
module.exports = resolvers;
