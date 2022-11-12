import { gql } from '@apollo/client';

// WEATHER MUTATIONS

// TO-DO MUTATIONS
export const ADD_TASK = gql`
  mutation addTask($taskText: String) {
    addTask(taskText: $taskText) {
        _id
        taskText
        createdAt
        priority
        completed
    }
  }
`;

export const REMOVE_TASK = gql`
  mutation removeTask($taskId: ID) {
    removeTask(taskId: $taskId) {
        _id
        taskText
        createdAt
        priority
        completed  
    }
  }
`;

export const EDIT_TASK = gql`
  mutation editTask($taskId: ID, $taskText: String) {
    editTask(taskId: $taskId, taskText: $taskText) {
        _id
        taskText
        createdAt
        priority
        completed
    }
  }
`;

export const COUNT_TOTAL = gql`
mutation countTotalTask {
  countTotalTask {
    totalTasks
  }
}
`;

export const COUNT_COMPLETED = gql`
mutation countCompletedTask {
  countCompletedTask {
    completedTasks
  }
}
`;

export const MARK_COMPLETED = gql`
mutation markCompletedTask($taskId: ID) {
  markCompletedTask(taskId: $taskId) {
    completed
  }
}
`;

export const COUNT_DELETE = gql`
mutation countDeleteTask {
  countDeleteTask {
    totalTasks
  }
}
`;

// QUOTE MUTATIONS

// CHART MUTATIONS
export const RESET_DATA = gql`
mutation resetData {
  resetData {
    completedTasks
    totalTasks
  }
}
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $location: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, location: $location, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        location
        email
        password
        totalTasks
        completedTasks
      }
    }
  }
`;



