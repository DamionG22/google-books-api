const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    bookId: ID!
    title: String!
    authors: [String!]!
    description: String!
    image: String
    link: String
    
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]


  }
  
  type Auth {
    token: ID!
    user: User
  }
  input BookInput{
    bookId: ID!
    title: String!
    authors: [String!]!
    description: String!
    image: String
    link: String
    
  }
  
  type Query {
    me: User
  }
  
  type Mutation {
    login(email:String!,password:String!): Auth
    addUser(email:String!,password:String!,username:String!): Auth
    saveBook(bookData:BookInput!): User
    removeBook(bookId:ID!): User

  }
  `;

  module.exports = typeDefs