const { gql } = require('apollo-server-express')

const typeDefs = gql`
type Book {
    authors: [String]
    description: String!
    bookId: String!
    _id: ID
    image: String
    link: String
    title: String!

}

type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]!
    bookCount: Int
}

type Auth {
    token: ID!
    user: User
}

type Query {
    getSingleUser: User
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(authors: [String], description: String! bookId: String!, _id: ID, image: String, link: String, title: String!): User
    deleteBook(bookId: String!): User
}
`
module.exports = typeDefs;