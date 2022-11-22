import {gql} from '@apollo/client'

export const QUERY_USER = gql`
    query GetSingleUser {
  getSingleUser {
    _id
    bookCount
    email
    password
    username
    savedBooks {
      _id
      authors
      bookId
      description
      image
      link
      title
    }
  }
}`;