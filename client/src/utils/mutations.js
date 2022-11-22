import {gql} from '@apollo/client'
 
export const CREATE_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      password
      bookCount
    }
  }
}`
export const LOGIN_USER = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      _id
      username
      email
      password
      savedBooks {
        authors
        description
        bookId
        _id
        image
        link
        title
      }
      bookCount
    }
  }
}`

export const SAVE_BOOK = gql`
mutation Mutation($description: String!, $bookId: String!, $title: String!, $authors: [String], $image: String) {
    saveBook(description: $description, bookId: $bookId, title: $title, authors: $authors, image: $image) {
      password
      email
      username
      savedBooks {
        authors
        description
        bookId
        _id
        image
        link
        title
      }
      bookCount
      _id
    }
  }`

export const DELETE_BOOK = gql`
mutation Mutation($bookId: String!) {
    deleteBook(bookId: $bookId) {
      username
      savedBooks {
        authors
        description
        bookId
        _id
        image
        link
        title
      }
      password
      email
    }
  }`
