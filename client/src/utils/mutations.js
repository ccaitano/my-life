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
    }
  }
`;

export const EDIT_TASK = gql`
  mutation editTask($taskId: ID) {
    editTask(taskId: $taskId) {
        _id
        taskText
        createdAt
        priority
    }
  }
`;

// QUOTE MUTATIONS

// CHART MUTATIONS


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
      }
    }
  }
`;



// export const ADD_COMMENT = gql`
//   mutation addComment($thoughtId: ID!, $commentText: String!) {
//     addComment(thoughtId: $thoughtId, commentText: $commentText) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         createdAt
//       }
//     }
//   }
// `;
