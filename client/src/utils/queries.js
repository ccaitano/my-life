import { gql } from '@apollo/client';

// WEATHER QUERIES

// TO-DO QUERIES
export const QUERY_TASKS = gql`
  query tasks{
    tasks {
      _id
      taskText
      createdAt
      priority
    }
  }
`;

export const QUERY_SINGLE_TASK = gql`
  query task($taskId: ID) {
    task(taskId: $taskId) {
      _id
      taskText
      createdAt
      priority
    }
  }
`;
// QUOTE QUERIES

// CHART QUERIES


export const QUERY_USERS = gql`
  query users {
    user {
      _id
      firstName
      lastName
      location
      email
      password
      tasks {
        _id
        taskText
        createdAt
        priority
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      firstName
      lastName
      location
      email
      password
      tasks {
        _id
        taskText
        createdAt
        priority
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      location
      email
      password
      tasks {
        _id
        taskText
        createdAt
        priority
      }
    }
  }
`;
