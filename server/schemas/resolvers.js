const { AuthenticationError } = require('apollo-server-express');
const { User, Task } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Query All Users
    users: async () => {
      return User.find().populate('tasks');
    },
    // Query Single User by Email
    user: async (parent, { email }) => {
      return User.findOne({ email }).populate('tasks');
    },
    // Query All Tasks created by a particular User email
    tasks: async (parent, { email }) => {
      const params = email ? { email } : {};
      return Task.find(params).sort({ createdAt: -1 });
    },
    // Query Single Task by Task Id
    task: async (parent, { taskId }) => {
      return Task.findOne({ taskId: taskId });
    },
    // Query current User with associated tasks
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('tasks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    

  },

  Mutation: {
    // Add New User
    addUser: async (parent, { firstName, lastName, location, email, password }) => {
      const user = await User.create({ firstName, lastName, location, email, password });
      const token = signToken(user);
      return { token, user };
    },

    // Login Existing User
    login: async (parent, { email, password }) => {
      // Find exiting User e-mail
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      // Verify password matches
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      // Assign token to user
      const token = signToken(user);

      return { token, user };
    },

    // Add New Task
    addTask: async (parent, { taskText }, context) => {
      if (context.user) {
        // Create Task Object
        const task = await Task.create({ taskText });
        // Update User data with new Task
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { tasks: task._id} },
          { new: true }
        );

        return task;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    // Delete Existing Task
    removeTask: async (parent,  { taskId }, context) => {
      if (context.user) {
        // Find Task and Delete
        await Task.findOneAndDelete(
          { _id: taskId},
          { new: true}
        );
        // Update User data
        const updatedTaskList = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { tasks: { _id: taskId } }},
          { new: true}
        );

        return updatedTaskList;
      
      };
      throw new AuthenticationError('You need to be logged in!');
    },
    
    // Edit Existing Task
    editTask: async (parent, { taskId, taskText }, context) => {
      if (context.user) {
        const task = await Task.findOneAndUpdate(
          { _id: taskId},
          { taskText: taskText },
          { new: true}
        );

        return task;
      
      };
      throw new AuthenticationError('You need to be logged in!');
    },

    // Keeps track of total task count for a particular user
    countTotalTask: async (parent, args, context) => {
      if (context.user) {
        const task = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $inc: {totalTasks: 1}},
          { new: true}
        );
          
        return task;
      
      };
      throw new AuthenticationError('You need to be logged in!');
    },

    // Keeps track of completed task count for a particular user
    countCompletedTask: async (parent, args, context) => {
      if (context.user) {
        const task = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $inc: {completedTasks: 1}},
          { new: true}
        );

        return task;
      
      };
      throw new AuthenticationError('You need to be logged in!');
    },

    // Marks a task as completed
    markCompletedTask: async (parent, {taskId}, context) => {
      if (context.user) {
        const task = await Task.findOneAndUpdate(
          { _id: taskId },
          { $set: {completed: true}},
          { new: true}
        );
       
        return task;
      
      };
      throw new AuthenticationError('You need to be logged in!');
    },

    // Removes a task from overall task count if an item is deleted
    countDeleteTask: async (parent, args, context) => {
      if (context.user) {
        const task = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $inc: {totalTasks: -1}},
          { new: true}
        );

        return task;
      
      };
      throw new AuthenticationError('You need to be logged in!');
    },
    // Reset User Data for Chart
    resetData: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: {completedTasks: 0, totalTasks: 0}},
          { new: true}
        );

        return updatedUser;
      
      };
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};
module.exports = resolvers;
