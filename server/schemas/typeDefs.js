const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    location: String
    email: String!
    password: String!
    tasks: [Task]
    totalTasks: Int
    completedTasks: Int
  }  
  
  type Task {
    _id: ID
    taskText: String
    createdAt: String
    priority: String
    completed: Boolean
  }

  input savedTaskInput {
    _id: ID
    taskText: String
    createdAt: String
    priority: String
    completed: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    # WEATHER QUERIES

    # TO-DO QUERIES
    tasks(email: String): [Task]
    task(taskId: ID): Task

    # QUOTE QUERIES

    # CHART QUERIES

    users: [User]
    user(email: String!): User
    me: User
   
  }

  type Mutation {
    # WEATHER MUTATIONS

    # TO-DO MUTATIONS
    addTask(taskText: String): Task
    removeTask(taskId: ID): Task
    editTask(taskId: ID, taskText: String): Task
    countTotalTask: User
    countCompletedTask: User
    markCompletedTask(taskId: ID): Task
    countDeleteTask: User
    # QUOTE MUTATIONS

    # CHART MUTATIONS
    resetData: User

    addUser(firstName: String!, lastName: String!, location: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
