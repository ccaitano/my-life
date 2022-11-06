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
  }  
  
  type Task {
    _id: ID
    taskText: String
    createdAt: String
    priority: String
  }

  input savedTaskInput {
    _id: ID
    taskText: String
    createdAt: String
    priority: String
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

    # QUOTE MUTATIONS

    # CHART MUTATIONS


    addUser(firstName: String!, lastName: String!, location: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    # addComment(thoughtId: ID!, commentText: String!): Thought
    # removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
