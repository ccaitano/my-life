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
          { $addToSet: { tasks: task._id} },
          { new: true }
        );

        return task;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
   
    removeTask: async (parent,  { taskId }, context) => {
      if (context.user) {
        const task = await Task.findOneAndDelete(
          { _id: taskId},
          { new: true}
        );

        const updatedTaskList = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { tasks: { _id: taskId } } },
          { new: true}
        );

        return updatedTaskList;
      
      };
      throw new AuthenticationError('You need to be logged in!');
    },

    editTask: async (parent, { taskId, taskText }, context) => {
      if (context.user) {
        const task = await Task.findOneAndUpdate(
          { _id: taskId},
          { taskText: taskText },
          { new: true}
        );

        // await User.findOneAndUpdate(
        //   { _id: context.user._id },
        //   { tasks: {taskText: taskText}},
        //   { new: true }
        // );

        return task;
      
      };
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};
module.exports = resolvers;
